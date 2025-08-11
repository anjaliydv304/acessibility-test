import React, { useState } from 'react';
import { Dialog } from './components/Dialog/Dialog';
import './App.css';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Accessibility Testing POC</h1>
        <p>
          This demo showcases the Dialog component with accessibility testing integration.
        </p>
      </header>

      <main className="App-main">
        <section className="demo-section">
          <h2>Dialog Component Demo</h2>
          <p>
            Test the dialog component below. Use keyboard navigation (Tab, Enter, Escape) 
            and screen readers to verify accessibility.
          </p>

          {/* Basic Dialog with Trigger */}
          <Dialog
            title="Basic Dialog"
            description="This is a basic dialog example with accessibility features."
            trigger={
              <button className="demo-button">
                Open Basic Dialog
              </button>
            }
          >
            <div className="dialog-content">
              <p>This dialog demonstrates:</p>
              <ul>
                <li>Focus trapping</li>
                <li>Keyboard navigation (Tab, Shift+Tab)</li>
                <li>ESC key to close</li>
                <li>Proper ARIA attributes</li>
                <li>Screen reader announcements</li>
              </ul>
              <div className="dialog-actions">
                <button className="action-button primary">
                  Primary Action
                </button>
                <button className="action-button secondary">
                  Secondary Action
                </button>
              </div>
            </div>
          </Dialog>

          {/* Controlled Dialog */}
          <Dialog
            title="Controlled Dialog"
            description="This dialog is controlled externally."
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <div className="dialog-content">
              <p>This is a controlled dialog example.</p>
              <p>The open state is managed by the parent component.</p>
              <button 
                className="action-button primary"
                onClick={() => setIsDialogOpen(false)}
              >
                Close Dialog
              </button>
            </div>
          </Dialog>

          <button 
            className="demo-button"
            onClick={() => setIsDialogOpen(true)}
          >
            Open Controlled Dialog
          </button>
        </section>

        <section className="testing-info">
          <h2>Testing Instructions</h2>
          <div className="testing-steps">
            <h3>Keyboard Testing:</h3>
            <ol>
              <li>Use <kbd>Tab</kbd> to navigate to dialog triggers</li>
              <li>Press <kbd>Enter</kbd> or <kbd>Space</kbd> to open dialog</li>
              <li>Use <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> to navigate within dialog</li>
              <li>Press <kbd>Escape</kbd> to close dialog</li>
              <li>Verify focus returns to trigger after closing</li>
            </ol>

            <h3>Screen Reader Testing:</h3>
            <ol>
              <li>Enable your screen reader (NVDA, JAWS, VoiceOver)</li>
              <li>Navigate to and activate dialog triggers</li>
              <li>Verify dialog title and description are announced</li>
              <li>Verify dialog role is announced</li>
              <li>Navigate through dialog content</li>
            </ol>

            <h3>Accessibility Audit:</h3>
            <ol>
              <li>Open browser Developer Tools</li>
              <li>Go to Lighthouse tab</li>
              <li>Run accessibility audit</li>
              <li>Verify 100/100 accessibility score</li>
              <li>Check for any ARIA or contrast violations</li>
            </ol>
          </div>
        </section>

        <section className="test-commands">
          <h2>Run Accessibility Tests</h2>
          <div className="commands">
            <p>Use these commands to run accessibility tests:</p>
            <code>npm run test:a11y</code> - Run accessibility tests<br/>
            <code>npm run test:a11y:watch</code> - Run tests in watch mode<br/>
            <code>npm run test:a11y:coverage</code> - Generate coverage report<br/>
            <code>npm run build</code> - Build with accessibility validation<br/>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;