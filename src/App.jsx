import { useEffect, useState } from 'react'
import './App.css'
import fallbackProfilePhoto from './assets/profile_photo.jpeg'
import fallbackWebsiteLogo from './assets/website_logo.jpeg'
import {
  defaultAdminCredentials,
  defaultSiteContent,
  SITE_ADMIN_SESSION_KEY,
  SITE_ADMIN_STORAGE_KEY,
  SITE_CONTENT_STORAGE_KEY,
} from './siteConfig'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : clone(fallback)
  } catch {
    return clone(fallback)
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function readSession(key, fallback = false) {
  try {
    return sessionStorage.getItem(key) === 'true' || fallback
  } catch {
    return fallback
  }
}

function writeSession(key, value) {
  sessionStorage.setItem(key, value ? 'true' : 'false')
}

function lineJoin(items) {
  return items.join('\n')
}

function lineSplit(text) {
  return text
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizeEmail(value) {
  if (!value.trim()) return ''
  return value.startsWith('mailto:') ? value : `mailto:${value.trim()}`
}

function normalizeWhatsApp(value) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
  const digits = trimmed.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : trimmed
}

function SectionInput({ label, value, onChange, textarea = false, rows = 4, type = 'text' }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {textarea ? (
        <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  )
}

function AssetUploader({ label, previewSrc, onFileSelect, onReset }) {
  return (
    <div className="admin-field admin-upload-field">
      <span>{label}</span>
      <div className="admin-upload-card">
        <div className="admin-upload-preview-wrap">
          {previewSrc ? (
            <img className="admin-upload-preview" src={previewSrc} alt={label} />
          ) : (
            <div className="admin-upload-empty">No image selected</div>
          )}
        </div>
        <div className="admin-upload-actions">
          <label className="admin-upload-button">
            Upload image
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) onFileSelect(file)
                event.target.value = ''
              }}
            />
          </label>
          <button className="admin-mini-button" type="button" onClick={onReset}>
            Reset image
          </button>
        </div>
      </div>
    </div>
  )
}

function AdminItemActions({ onAdd, onRemove, canRemove, addLabel = 'Add item' }) {
  return (
    <div className="admin-inline-actions">
      <button className="admin-mini-button" type="button" onClick={onAdd}>
        {addLabel}
      </button>
      {canRemove ? (
        <button className="admin-mini-button admin-danger" type="button" onClick={onRemove}>
          Remove
        </button>
      ) : null}
    </div>
  )
}

function SafeImage({ className, src, fallbackSrc, alt }) {
  return (
    <img
      className={className}
      src={src || fallbackSrc}
      alt={alt}
      onError={(event) => {
        if (event.currentTarget.src !== fallbackSrc) {
          event.currentTarget.src = fallbackSrc
        }
      }}
    />
  )
}

function PublicSite({ content }) {
  const hasRealFormLink = Boolean(content.contact.form)

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand-block" href="#home" aria-label="Go to home">
          <SafeImage
            className="brand-logo"
            src={content.branding.logoSrc}
            fallbackSrc={fallbackWebsiteLogo}
            alt="K Sangameshwar Sports Psychologist logo"
          />
          <div>
            <p className="brand-name">{content.branding.brandName}</p>
            <p className="brand-tag">{content.branding.brandTag}</p>
          </div>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {content.navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="button button-small button-outline" href="#contact">
          {content.hero.ctaPrimary}
        </a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1>{content.hero.title}</h1>
            <h2>{content.hero.subtitle}</h2>
            <p className="hero-hook">{content.hero.hook}</p>

            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                {content.hero.ctaPrimary}
              </a>
              <a className="button button-secondary" href="#programs">
                {content.hero.ctaSecondary}
              </a>
            </div>

            <div className="hero-metrics">
              {content.hero.metrics.map((metric) => (
                <div key={metric.title}>
                  <strong>{metric.title}</strong>
                  <span>{metric.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-card hero-card-primary">
              <p className="card-label">{content.hero.whoYouHelpCardTitle}</p>
              <ul>
                {content.whoYouHelp.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="hero-card hero-card-secondary">
              <p className="card-label">{content.hero.performanceFocusTitle}</p>
              <p>{content.hero.performanceFocusText}</p>
            </div>
          </div>
        </section>

        <section className="content-section split-section">
          <div className="section-heading">
            <p className="eyebrow">{content.whoYouHelp.eyebrow}</p>
            <h3>{content.whoYouHelp.title}</h3>
          </div>

          <div className="grid cards-grid">
            {content.whoYouHelp.items.map((item, index) => (
              <article className="info-card" key={item}>
                <span className="card-index">{String(index + 1).padStart(2, '0')}</span>
                <h4>{item}</h4>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section authority-section">
          <div className="section-heading">
            <p className="eyebrow">{content.authority.eyebrow}</p>
            <h3>{content.authority.title}</h3>
          </div>

          <div className="authority-layout">
            <article className="authority-copy">
              {content.authority.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>

            <aside className="authority-panel">
              <div>
                {content.authority.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="content-section" id="about">
          <div className="section-heading">
            <p className="eyebrow">{content.about.eyebrow}</p>
            <h3>{content.about.title}</h3>
          </div>

          <div className="grid two-column-grid">
            <article className="panel-card about-photo-card">
              <div className="about-photo-frame">
                <SafeImage
                  className="about-photo"
                  src={content.branding.profilePhotoSrc}
                  fallbackSrc={fallbackProfilePhoto}
                  alt="Sports psychologist Sangameshwar"
                />
              </div>
            </article>

            <article className="panel-card about-intro-card">
              {content.about.introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>

            <article className="panel-card about-specializations-card">
              <h4>I specialize in</h4>
              <ul className="check-list">
                {content.about.specializations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="panel-card about-sports-card">
              <h4>I work with athletes in</h4>
              <ul className="pill-list">
                {content.about.sports.map((sport) => (
                  <li key={sport}>{sport}</li>
                ))}
              </ul>
            </article>

            <article className="panel-card about-method-card">
              <h4>My method is based on</h4>
              <ul className="check-list">
                {content.about.methods.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="panel-card about-experience-card">
              <h4>Professional experience</h4>
              <div className="experience-grid about-experience-grid">
                {content.about.experience.map((item) => (
                  <article className="experience-card" key={`${item.role}-${item.organization}`}>
                    <div className="experience-topline">
                      <span className="experience-badge">{item.years}</span>
                    </div>
                    <h4>{item.role}</h4>
                    <p className="experience-org">{item.organization}</p>
                    <ul className="check-list experience-list">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </article>

            <article className="panel-card about-education-card">
              <h4>Educational background</h4>
              <ul className="education-list">
                {content.about.education.map((item) => (
                  <li key={`${item.degree}-${item.institution}`}>
                    <strong>{item.degree}</strong>
                    <span>{item.institution}</span>
                    <small>{item.years}</small>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">{content.services.eyebrow}</p>
            <h3>{content.services.title}</h3>
          </div>

          <div className="grid services-grid">
            {content.services.items.map((service) => (
              <article className="service-card" key={service.title}>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section results-section">
          <div className="section-heading">
            <p className="eyebrow">{content.results.eyebrow}</p>
            <h3>{content.results.title}</h3>
          </div>

          <div className="results-layout">
            <div className="results-list">
              {content.results.items.map((item) => (
                <div className="result-item" key={item}>
                  <span>+</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="results-cta">
              <p>{content.results.ctaText}</p>
              <a className="button button-primary" href="#contact">
                {content.results.ctaButtonLabel}
              </a>
            </div>
          </div>
        </section>

        <section className="content-section" id="programs">
          <div className="section-heading">
            <p className="eyebrow">{content.programs.eyebrow}</p>
            <h3>{content.programs.title}</h3>
          </div>

          <div className="grid program-grid">
            {content.programs.items.map((program) => (
              <article className="program-card" key={program.title}>
                <h4>{program.title}</h4>
                <ul className="check-list">
                  {program.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <a
                  className="text-link"
                  href={hasRealFormLink ? content.contact.form : '#contact'}
                  target={hasRealFormLink ? '_blank' : undefined}
                  rel={hasRealFormLink ? 'noreferrer' : undefined}
                >
                  Book Session
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section contact-section" id="contact">
          <div className="section-heading">
            <p className="eyebrow">{content.contact.eyebrow}</p>
            <h3>{content.contact.title}</h3>
            <p className="section-intro">{content.contact.intro}</p>
          </div>

          <div className="contact-layout">
            <article className="contact-card contact-card-form">
              <h4>Application flow</h4>
              <p>
                Use the Google Form to apply. Serious athletes will be contacted within 24 hours
                for the next steps.
              </p>
              <a
                className="button button-primary"
                href={hasRealFormLink ? content.contact.form : '#contact'}
                target={hasRealFormLink ? '_blank' : undefined}
                rel={hasRealFormLink ? 'noreferrer' : undefined}
              >
                {hasRealFormLink ? content.contact.formLabel : 'Application Form Coming Soon'}
              </a>
            </article>

            <article className="contact-card">
              <h4>Required form questions</h4>
              <ul className="check-list compact-list">
                {content.contact.formFields.map((field) => (
                  <li key={field}>{field}</li>
                ))}
              </ul>
            </article>

            <article className="contact-card">
              <h4>Direct contact</h4>
              <div className="contact-links">
                <a href={content.contact.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
                <a href={content.contact.email} target="_blank" rel="noreferrer">
                  Email
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand-block footer-brand-block" href="#home" aria-label="Go to home">
              <SafeImage
                className="brand-logo footer-logo"
                src={content.branding.logoSrc}
                fallbackSrc={fallbackWebsiteLogo}
                alt="K Sangameshwar logo"
              />
              <div>
                <p className="brand-name">{content.branding.brandName}</p>
                <p className="brand-tag">{content.branding.brandTag}</p>
              </div>
            </a>
            <p className="footer-copy">{content.footer.summary}</p>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Explore</p>
            <div className="footer-links">
              {content.navigation.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Programs</p>
            <div className="footer-links">
              {content.programs.items.map((program) => (
                <a key={program.title} href="#programs">
                  {program.title}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <p className="footer-heading">Contact</p>
            <div className="footer-links">
              <a href={content.contact.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={content.contact.email} target="_blank" rel="noreferrer">
                Email
              </a>
              <a href={content.contact.form} target="_blank" rel="noreferrer">
                Application Form
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{content.footer.copyright}</p>
          <a href="#home">Back to top</a>
        </div>
      </footer>
    </div>
  )
}

function AdminApp({
  draft,
  loginForm,
  authError,
  isAuthenticated,
  saveState,
  onLoginChange,
  onLogin,
  onLogout,
  onSave,
  onReset,
  onDraftChange,
  onAssetUpload,
  onAssetReset,
  credentialDraft,
  onCredentialDraftChange,
  onCredentialSave,
}) {
  if (!isAuthenticated) {
    return (
      <div className="admin-shell">
        <div className="admin-login-card">
          <p className="eyebrow">Client Portal</p>
          <h1>Website Control Panel</h1>
          <p className="admin-intro">
            Sign in to update branding, profile photo, headings, sections, contact links, services,
            programs, experience, and footer text without editing code.
          </p>
          <div className="admin-login-grid">
            <SectionInput
              label="Username"
              value={loginForm.username}
              onChange={(value) => onLoginChange('username', value)}
            />
            <SectionInput
              label="Password"
              type="password"
              value={loginForm.password}
              onChange={(value) => onLoginChange('password', value)}
            />
          </div>
          {authError ? <p className="admin-error">{authError}</p> : null}
          <button className="button button-primary admin-submit" type="button" onClick={onLogin}>
            Login
          </button>
          <p className="admin-security-note">
            Current setup is a frontend admin panel. It is convenient, but true production security
            requires a backend database and server-side authentication.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Website Content Manager</h1>
        </div>
        <div className="admin-topbar-actions">
          <a className="button button-outline" href="#home">
            View Public Site
          </a>
          <button className="button button-outline" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="admin-content">
        <section className={`admin-status-card ${saveState.type ? `is-${saveState.type}` : ''}`}>
          <p>{saveState.message}</p>
        </section>

        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Credentials</h2>
              <p>Change the admin username and password used for this control panel.</p>
            </div>
            <button className="button button-secondary" type="button" onClick={onCredentialSave}>
              Save Credentials
            </button>
          </div>
          <div className="admin-grid two">
            <SectionInput
              label="Admin username"
              value={credentialDraft.username}
              onChange={(value) => onCredentialDraftChange('username', value)}
            />
            <SectionInput
              label="Admin password"
              type="password"
              value={credentialDraft.password}
              onChange={(value) => onCredentialDraftChange('password', value)}
            />
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Branding</h2>
              <p>Use public image paths like `/Logos/website_logo.jpeg` or external image URLs.</p>
            </div>
          </div>
          <div className="admin-grid two">
            <SectionInput
              label="Brand name"
              value={draft.branding.brandName}
              onChange={(value) => onDraftChange('branding.brandName', value)}
            />
            <SectionInput
              label="Brand tagline"
              value={draft.branding.brandTag}
              onChange={(value) => onDraftChange('branding.brandTag', value)}
            />
            <SectionInput
              label="Logo image path"
              value={draft.branding.logoSrc}
              onChange={(value) => onDraftChange('branding.logoSrc', value)}
            />
            <SectionInput
              label="Profile photo path"
              value={draft.branding.profilePhotoSrc}
              onChange={(value) => onDraftChange('branding.profilePhotoSrc', value)}
            />
          </div>
          <div className="admin-grid two">
            <AssetUploader
              label="Website logo upload"
              previewSrc={draft.branding.logoSrc}
              onFileSelect={(file) => onAssetUpload('branding.logoSrc', file)}
              onReset={() => onAssetReset('branding.logoSrc', defaultSiteContent.branding.logoSrc)}
            />
            <AssetUploader
              label="Profile photo upload"
              previewSrc={draft.branding.profilePhotoSrc}
              onFileSelect={(file) => onAssetUpload('branding.profilePhotoSrc', file)}
              onReset={() =>
                onAssetReset('branding.profilePhotoSrc', defaultSiteContent.branding.profilePhotoSrc)
              }
            />
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Hero</h2>
              <p>Update the homepage first impression and key performance messaging.</p>
            </div>
          </div>
          <div className="admin-grid two">
            <SectionInput
              label="Eyebrow"
              value={draft.hero.eyebrow}
              onChange={(value) => onDraftChange('hero.eyebrow', value)}
            />
            <SectionInput
              label="Primary CTA label"
              value={draft.hero.ctaPrimary}
              onChange={(value) => onDraftChange('hero.ctaPrimary', value)}
            />
            <SectionInput
              label="Headline"
              value={draft.hero.title}
              onChange={(value) => onDraftChange('hero.title', value)}
            />
            <SectionInput
              label="Secondary CTA label"
              value={draft.hero.ctaSecondary}
              onChange={(value) => onDraftChange('hero.ctaSecondary', value)}
            />
            <SectionInput
              label="Subheadline"
              value={draft.hero.subtitle}
              onChange={(value) => onDraftChange('hero.subtitle', value)}
            />
            <SectionInput
              label="Who you help card label"
              value={draft.hero.whoYouHelpCardTitle}
              onChange={(value) => onDraftChange('hero.whoYouHelpCardTitle', value)}
            />
          </div>
          <SectionInput
            label="Hook line"
            textarea
            rows={3}
            value={draft.hero.hook}
            onChange={(value) => onDraftChange('hero.hook', value)}
          />
          <SectionInput
            label="Performance focus text"
            textarea
            rows={3}
            value={draft.hero.performanceFocusText}
            onChange={(value) => onDraftChange('hero.performanceFocusText', value)}
          />
        </section>

        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Quick Lists</h2>
              <p>Use one item per line for these repeating lists.</p>
            </div>
          </div>
          <div className="admin-grid two">
            <SectionInput
              label="Who you help"
              textarea
              rows={6}
              value={lineJoin(draft.whoYouHelp.items)}
              onChange={(value) => onDraftChange('whoYouHelp.items', lineSplit(value))}
            />
            <SectionInput
              label="Results"
              textarea
              rows={6}
              value={lineJoin(draft.results.items)}
              onChange={(value) => onDraftChange('results.items', lineSplit(value))}
            />
            <SectionInput
              label="Specializations"
              textarea
              rows={8}
              value={lineJoin(draft.about.specializations)}
              onChange={(value) => onDraftChange('about.specializations', lineSplit(value))}
            />
            <SectionInput
              label="Sports"
              textarea
              rows={8}
              value={lineJoin(draft.about.sports)}
              onChange={(value) => onDraftChange('about.sports', lineSplit(value))}
            />
            <SectionInput
              label="Methods"
              textarea
              rows={4}
              value={lineJoin(draft.about.methods)}
              onChange={(value) => onDraftChange('about.methods', lineSplit(value))}
            />
            <SectionInput
              label="Required form fields"
              textarea
              rows={6}
              value={lineJoin(draft.contact.formFields)}
              onChange={(value) => onDraftChange('contact.formFields', lineSplit(value))}
            />
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>About, Authority, Services and Contact</h2>
              <p>Edit core profile text, trust-building copy, and contact details.</p>
            </div>
          </div>
          <div className="admin-grid two">
            <SectionInput
              label="About title"
              value={draft.about.title}
              onChange={(value) => onDraftChange('about.title', value)}
            />
            <SectionInput
              label="Authority title"
              value={draft.authority.title}
              onChange={(value) => onDraftChange('authority.title', value)}
            />
            <SectionInput
              label="About intro paragraphs"
              textarea
              rows={5}
              value={lineJoin(draft.about.introParagraphs)}
              onChange={(value) => onDraftChange('about.introParagraphs', lineSplit(value))}
            />
            <SectionInput
              label="Authority paragraphs"
              textarea
              rows={5}
              value={lineJoin(draft.authority.paragraphs)}
              onChange={(value) => onDraftChange('authority.paragraphs', lineSplit(value))}
            />
            <SectionInput
              label="Authority tags"
              textarea
              rows={4}
              value={lineJoin(draft.authority.tags)}
              onChange={(value) => onDraftChange('authority.tags', lineSplit(value))}
            />
            <SectionInput
              label="Services section title"
              value={draft.services.title}
              onChange={(value) => onDraftChange('services.title', value)}
            />
            <SectionInput
              label="Contact title"
              value={draft.contact.title}
              onChange={(value) => onDraftChange('contact.title', value)}
            />
            <SectionInput
              label="Contact intro"
              value={draft.contact.intro}
              onChange={(value) => onDraftChange('contact.intro', value)}
            />
            <SectionInput
              label="Google Form URL"
              value={draft.contact.form}
              onChange={(value) => onDraftChange('contact.form', value)}
            />
            <SectionInput
              label="Application form button label"
              value={draft.contact.formLabel}
              onChange={(value) => onDraftChange('contact.formLabel', value)}
            />
            <SectionInput
              label="WhatsApp number or URL"
              value={draft.contact.whatsapp}
              onChange={(value) => onDraftChange('contact.whatsapp', value)}
            />
            <SectionInput
              label="Email address or mailto link"
              value={draft.contact.email}
              onChange={(value) => onDraftChange('contact.email', value)}
            />
            <SectionInput
              label="Footer summary"
              textarea
              rows={3}
              value={draft.footer.summary}
              onChange={(value) => onDraftChange('footer.summary', value)}
            />
            <SectionInput
              label="Footer copyright"
              value={draft.footer.copyright}
              onChange={(value) => onDraftChange('footer.copyright', value)}
            />
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Services</h2>
              <p>Manage core offer boxes on the public site.</p>
            </div>
          </div>
          <div className="admin-stack">
            {draft.services.items.map((item, index) => (
              <div className="admin-repeat-card" key={`service-${index}`}>
                <div className="admin-repeat-header">
                  <h3>Service {index + 1}</h3>
                  <AdminItemActions
                    addLabel="Add service"
                    onAdd={() =>
                      onDraftChange('services.items', [
                        ...draft.services.items,
                        { title: 'New Service', description: 'Service description' },
                      ])
                    }
                    onRemove={() =>
                      onDraftChange(
                        'services.items',
                        draft.services.items.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                    canRemove={draft.services.items.length > 1}
                  />
                </div>
                <div className="admin-grid two">
                  <SectionInput
                    label="Title"
                    value={item.title}
                    onChange={(value) => onDraftChange(`services.items.${index}.title`, value)}
                  />
                  <SectionInput
                    label="Description"
                    value={item.description}
                    onChange={(value) => onDraftChange(`services.items.${index}.description`, value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Programs</h2>
              <p>Update session/program titles and the detail points shown under each program.</p>
            </div>
          </div>
          <div className="admin-stack">
            {draft.programs.items.map((item, index) => (
              <div className="admin-repeat-card" key={`program-${index}`}>
                <div className="admin-repeat-header">
                  <h3>Program {index + 1}</h3>
                  <AdminItemActions
                    addLabel="Add program"
                    onAdd={() =>
                      onDraftChange('programs.items', [
                        ...draft.programs.items,
                        { title: 'New Program', details: ['Point 1', 'Point 2'] },
                      ])
                    }
                    onRemove={() =>
                      onDraftChange(
                        'programs.items',
                        draft.programs.items.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                    canRemove={draft.programs.items.length > 1}
                  />
                </div>
                <SectionInput
                  label="Program title"
                  value={item.title}
                  onChange={(value) => onDraftChange(`programs.items.${index}.title`, value)}
                />
                <SectionInput
                  label="Program detail points"
                  textarea
                  rows={5}
                  value={lineJoin(item.details)}
                  onChange={(value) => onDraftChange(`programs.items.${index}.details`, lineSplit(value))}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Professional Experience</h2>
              <p>Manage the About page experience cards and highlight bullets.</p>
            </div>
          </div>
          <div className="admin-stack">
            {draft.about.experience.map((item, index) => (
              <div className="admin-repeat-card" key={`experience-${index}`}>
                <div className="admin-repeat-header">
                  <h3>Experience {index + 1}</h3>
                  <AdminItemActions
                    addLabel="Add experience"
                    onAdd={() =>
                      onDraftChange('about.experience', [
                        ...draft.about.experience,
                        { role: 'Sports Psychologist', organization: 'Organization', years: 'Year', highlights: ['Highlight'] },
                      ])
                    }
                    onRemove={() =>
                      onDraftChange(
                        'about.experience',
                        draft.about.experience.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                    canRemove={draft.about.experience.length > 1}
                  />
                </div>
                <div className="admin-grid two">
                  <SectionInput
                    label="Role"
                    value={item.role}
                    onChange={(value) => onDraftChange(`about.experience.${index}.role`, value)}
                  />
                  <SectionInput
                    label="Years"
                    value={item.years}
                    onChange={(value) => onDraftChange(`about.experience.${index}.years`, value)}
                  />
                </div>
                <SectionInput
                  label="Organization"
                  textarea
                  rows={3}
                  value={item.organization}
                  onChange={(value) => onDraftChange(`about.experience.${index}.organization`, value)}
                />
                <SectionInput
                  label="Highlights"
                  textarea
                  rows={7}
                  value={lineJoin(item.highlights)}
                  onChange={(value) => onDraftChange(`about.experience.${index}.highlights`, lineSplit(value))}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <h2>Education</h2>
              <p>Update degree, institution, and year ranges shown in the About section.</p>
            </div>
          </div>
          <div className="admin-stack">
            {draft.about.education.map((item, index) => (
              <div className="admin-repeat-card" key={`education-${index}`}>
                <div className="admin-repeat-header">
                  <h3>Education {index + 1}</h3>
                  <AdminItemActions
                    addLabel="Add education"
                    onAdd={() =>
                      onDraftChange('about.education', [
                        ...draft.about.education,
                        { degree: 'Degree', institution: 'Institution', years: 'Years' },
                      ])
                    }
                    onRemove={() =>
                      onDraftChange(
                        'about.education',
                        draft.about.education.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                    canRemove={draft.about.education.length > 1}
                  />
                </div>
                <div className="admin-grid two">
                  <SectionInput
                    label="Degree"
                    value={item.degree}
                    onChange={(value) => onDraftChange(`about.education.${index}.degree`, value)}
                  />
                  <SectionInput
                    label="Years"
                    value={item.years}
                    onChange={(value) => onDraftChange(`about.education.${index}.years`, value)}
                  />
                </div>
                <SectionInput
                  label="Institution"
                  value={item.institution}
                  onChange={(value) => onDraftChange(`about.education.${index}.institution`, value)}
                />
              </div>
            ))}
          </div>
        </section>

        <div className="admin-footer-actions">
          <button className="button button-primary" type="button" onClick={onSave}>
            Save Website Changes
          </button>
          <button className="button button-outline" type="button" onClick={onReset}>
            Reset to Current Defaults
          </button>
        </div>
      </main>
    </div>
  )
}

function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.hash === '#admin')
  const [siteContent, setSiteContent] = useState(() => readStorage(SITE_CONTENT_STORAGE_KEY, defaultSiteContent))
  const [draft, setDraft] = useState(() => readStorage(SITE_CONTENT_STORAGE_KEY, defaultSiteContent))
  const [adminCredentials, setAdminCredentials] = useState(() =>
    readStorage(SITE_ADMIN_STORAGE_KEY, defaultAdminCredentials),
  )
  const [credentialDraft, setCredentialDraft] = useState(() =>
    readStorage(SITE_ADMIN_STORAGE_KEY, defaultAdminCredentials),
  )
  const [isAuthenticated, setIsAuthenticated] = useState(() => readSession(SITE_ADMIN_SESSION_KEY))
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [authError, setAuthError] = useState('')
  const [saveState, setSaveState] = useState({
    type: '',
    message: 'Make changes in the client panel, then click "Save Website Changes".',
  })

  useEffect(() => {
    if (!saveState.type || saveState.type === 'pending') return undefined

    const timer = window.setTimeout(() => {
      setSaveState((current) =>
        current.type === 'pending'
          ? current
          : {
              type: '',
              message: 'Make changes in the client panel, then click "Save Website Changes".',
            },
      )
    }, 3200)

    return () => window.clearTimeout(timer)
  }, [saveState])

  useEffect(() => {
    const onHashChange = () => {
      const adminMode = window.location.hash === '#admin'
      setIsAdminRoute(adminMode)
      if (adminMode) {
        setDraft(clone(siteContent))
        setCredentialDraft(clone(adminCredentials))
      }
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [adminCredentials, siteContent])

  const updateByPath = (path, value) => {
    setSaveState({
      type: 'pending',
      message: 'You have unsaved changes. Click "Save Website Changes" to publish them in this browser.',
    })
    setDraft((current) => {
      const next = clone(current)
      const keys = path.split('.')
      let cursor = next

      for (let index = 0; index < keys.length - 1; index += 1) {
        const rawKey = keys[index]
        const key = Number.isNaN(Number(rawKey)) ? rawKey : Number(rawKey)
        cursor = cursor[key]
      }

      const lastRawKey = keys[keys.length - 1]
      const lastKey = Number.isNaN(Number(lastRawKey)) ? lastRawKey : Number(lastRawKey)
      cursor[lastKey] = value
      return next
    })
  }

  const uploadAsset = (path, file) => {
    const reader = new FileReader()
    reader.onload = () => {
      updateByPath(path, typeof reader.result === 'string' ? reader.result : '')
      setSaveState({
        type: 'pending',
        message: `Image loaded for ${path.includes('logo') ? 'logo' : 'profile photo'}. Click "Save Website Changes" to keep it.`,
      })
    }
    reader.onerror = () => {
      setSaveState({
        type: 'error',
        message: 'Image upload failed. Try a PNG, JPG, WEBP, or SVG file.',
      })
    }
    reader.readAsDataURL(file)
  }

  const resetAsset = (path, fallback) => {
    updateByPath(path, fallback)
  }

  const saveContent = () => {
    try {
      const normalized = clone(draft)
      normalized.contact.email = normalizeEmail(normalized.contact.email)
      normalized.contact.whatsapp = normalizeWhatsApp(normalized.contact.whatsapp)
      writeStorage(SITE_CONTENT_STORAGE_KEY, normalized)
      setSiteContent(normalized)
      setDraft(clone(normalized))
      setSaveState({
        type: 'success',
        message: 'Website changes saved successfully. Open "View Public Site" to verify the latest content.',
      })
    } catch {
      setSaveState({
        type: 'error',
        message:
          'Saving failed in this browser. Check whether browser storage is blocked, then try again.',
      })
    }
  }

  const resetContent = () => {
    try {
      writeStorage(SITE_CONTENT_STORAGE_KEY, defaultSiteContent)
      const next = clone(defaultSiteContent)
      setSiteContent(next)
      setDraft(next)
      setSaveState({
        type: 'success',
        message: 'Website content has been reset to the current default version.',
      })
    } catch {
      setSaveState({
        type: 'error',
        message: 'Reset failed in this browser. Check storage permissions and try again.',
      })
    }
  }

  const saveCredentials = () => {
    const next = {
      username: credentialDraft.username.trim() || defaultAdminCredentials.username,
      password: credentialDraft.password || defaultAdminCredentials.password,
    }
    writeStorage(SITE_ADMIN_STORAGE_KEY, next)
    setAdminCredentials(next)
    setCredentialDraft(next)
  }

  const handleLogin = () => {
    if (
      loginForm.username === adminCredentials.username &&
      loginForm.password === adminCredentials.password
    ) {
      setAuthError('')
      setIsAuthenticated(true)
      writeSession(SITE_ADMIN_SESSION_KEY, true)
    } else {
      setAuthError('Invalid username or password.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    writeSession(SITE_ADMIN_SESSION_KEY, false)
    setLoginForm({ username: '', password: '' })
  }

  if (isAdminRoute) {
    return (
      <>
        {saveState.type && saveState.type !== 'pending' ? (
          <div className={`admin-toast is-${saveState.type}`} role="status" aria-live="polite">
            <p>{saveState.message}</p>
          </div>
        ) : null}
        <AdminApp
          credentialDraft={credentialDraft}
          draft={draft}
          loginForm={loginForm}
          authError={authError}
          isAuthenticated={isAuthenticated}
          saveState={saveState}
          onLoginChange={(field, value) => setLoginForm((current) => ({ ...current, [field]: value }))}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onSave={saveContent}
          onReset={resetContent}
          onDraftChange={updateByPath}
          onAssetUpload={uploadAsset}
          onAssetReset={resetAsset}
          onCredentialDraftChange={(field, value) =>
            setCredentialDraft((current) => ({ ...current, [field]: value }))
          }
          onCredentialSave={saveCredentials}
        />
      </>
    )
  }

  return <PublicSite content={siteContent} />
}

export default App
