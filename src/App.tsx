import React from 'react';
import { Card } from './components/Card';
import { PageTitle } from './components/page-title';
import { AdminTemplate } from './templates/admin/admin';

function App() {
  return (
    <AdminTemplate>
      <PageTitle>
        Hello, world!
      </PageTitle>
      <Card>

      </Card>
    </AdminTemplate>
  );
}

export default App;
