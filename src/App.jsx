import React, { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { ChevronLeft, Home, PieChart as PieIcon, Activity, ShieldCheck, FileText, Bell, Search } from 'lucide-react'
import { motion } from 'framer-motion'

// --- Helpers / constants ---
const SCREEN_TITLES = {
  dashboard: 'Dashboard',
  aggregator: 'Investment Aggregator',
  predictor: 'AI Growth Predictor',
  risk: 'Risk & Diversification',
  tax: 'Tax & Compliance',
  news: 'News & Insights',
}

function screenTitle(key) {
  return SCREEN_TITLES[key] || 'Dashboard'
}

// Mock data
const portfolioData = [
  { name: 'Jan', value: 850000 },
  { name: 'Feb', value: 870000 },
  { name: 'Mar', value: 890000 },
  { name: 'Apr', value: 910000 },
  { name: 'May', value: 940000 },
  { name: 'Jun', value: 980000 },
  { name: 'Jul', value: 1010000 },
]

const allocation = [
  { name: 'Stocks', value: 45 },
  { name: 'Mutual Funds', value: 25 },
  { name: 'Crypto', value: 12 },
  { name: 'Real Estate', value: 10 },
  { name: 'Bonds', value: 8 },
]

const COLORS = ['#4F46E5', '#06B6D4', '#F97316', '#10B981', '#EF4444']

export default function AIInvestmentTrackerUI() {
  const [screen, setScreen] = useState('dashboard')
  const [syncing, setSyncing] = useState(false)
  const [extra, setExtra] = useState(5000)

  // Net worth and ROI are derived from the mock dataset. If the data becomes dynamic,
  // these should include the data variable as dependencies.
  const netWorth = useMemo(() => portfolioData[portfolioData.length - 1].value, [])
  const roi = useMemo(() => {
    const start = portfolioData[0].value
    const end = portfolioData[portfolioData.length - 1].value
    return (((end - start) / start) * 100).toFixed(2)
  }, [])

  // Projected value based on current net worth and an extra monthly contribution.
  // Memoized to avoid recalculating on every render unless `extra` or `netWorth` changes.
  const projectedValue = useMemo(() => {
    const years = 5
    const months = years * 12
    const monthlyReturn = 0.007
    let balance = netWorth
    for (let i = 0; i < months; i++) {
      balance = balance * (1 + monthlyReturn) + extra
    }
    return Math.round(balance)
  }, [extra, netWorth])

  return (
    <div style={{minHeight:'100vh', display:'flex', background:'#f9fafb', color:'#1f2937'}}>
      {/* Sidebar */}
      <aside style={{width:'280px', background:'#fff', borderRight:'1px solid #e5e7eb', padding:'24px', display:'flex', flexDirection:'column', gap:'24px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <div style={{width:'48px', height:'48px', background:'linear-gradient(to bottom right, #4F46E5, #06B6D4)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:'bold'}}>AI</div>
          <div>
            <div style={{fontSize:'16px', fontWeight:'600'}}>AI Investment</div>
            <div style={{fontSize:'12px', color:'#6b7280'}}>Tracker Prototype</div>
          </div>
        </div>

        <nav style={{flex:1}}>
          <SidebarItem icon={<Home size={16} />} label="Dashboard" active={screen === 'dashboard'} onClick={() => setScreen('dashboard')} />
          <SidebarItem icon={<PieIcon size={16} />} label="Aggregator" active={screen === 'aggregator'} onClick={() => setScreen('aggregator')} />
          <SidebarItem icon={<Activity size={16} />} label="AI Predictor" active={screen === 'predictor'} onClick={() => setScreen('predictor')} />
          <SidebarItem icon={<ShieldCheck size={16} />} label="Risk & Diversify" active={screen === 'risk'} onClick={() => setScreen('risk')} />
          <SidebarItem icon={<FileText size={16} />} label="Tax & Reports" active={screen === 'tax'} onClick={() => setScreen('tax')} />
          <SidebarItem icon={<Bell size={16} />} label="News & Alerts" active={screen === 'news'} onClick={() => setScreen('news')} />
        </nav>

        <div style={{fontSize:'12px', color:'#6b7280'}}>Preview Mode • Static data</div>
        <div style={{display:'flex', gap:'8px'}}>
          <button style={{flex:1, padding:'8px', borderRadius:'8px', border:'1px solid #e5e7eb'}}>Settings</button>
          <button style={{padding:'8px 12px', borderRadius:'8px', background:'#4F46E5', color:'#fff'}}>Share</button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{flex:1, padding:'32px'}}>
        <header style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
            <button style={{padding:'8px', borderRadius:'6px', border:'none', background:'#f3f4f6'}} onClick={() => setScreen('dashboard')}><ChevronLeft size={18} /></button>
            <div>
              <div style={{fontSize:'14px', color:'#6b7280'}}>Good Morning, Alex 👋</div>
              <div style={{fontSize:'20px', fontWeight:'600'}}>{screenTitle(screen)}</div>
            </div>
          </div>

          <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <div style={{position:'relative'}}>
              <input style={{border:'1px solid #e5e7eb', borderRadius:'8px', padding:'8px 12px', width:'280px'}} placeholder="Search investments or news" />
              <div style={{position:'absolute', right:'8px', top:'8px'}}><Search size={16} /></div>
            </div>
            <button style={{padding:'8px 12px', borderRadius:'8px', background:'#10B981', color:'#fff'}}>+ Add Investment</button>
            <button style={{padding:'8px 12px', borderRadius:'8px', border:'1px solid #e5e7eb'}}>Export</button>
          </div>
        </header>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:'24px'}}>
          {/* Left column */}
          <section style={{display:'flex', flexDirection:'column', gap:'24px'}}>
            {screen === 'dashboard' && (
              <>
                <Card>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                      <div style={{fontSize:'14px', color:'#6b7280'}}>Net Worth</div>
                      <div style={{fontSize:'24px', fontWeight:'bold'}}>₹{formatNumber(netWorth)}</div>
                      <div style={{fontSize:'14px', color:'#6b7280'}}>ROI (last 6 months): {roi}%</div>
                    </div>
                    <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
                      <div style={{fontSize:'14px', color:'#6b7280'}}>Risk: <span style={{fontWeight:'600', color:'#f97316'}}>Medium</span></div>
                      <div style={{fontSize:'14px', color:'#6b7280'}}>Diversification: <span style={{fontWeight:'600', color:'#10B981'}}>Good</span></div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div style={{display:'flex', gap:'16px'}}>
                    <div style={{flex:2, height:220}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={portfolioData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div style={{flex:1}}>
                      <div style={{fontWeight:'600', marginBottom:8}}>Allocation</div>
                      <ResponsiveContainer width="100%" height={170}>
                        <PieChart>
                          <Pie data={allocation} dataKey="value" nameKey="name" innerRadius={30} outerRadius={60} label>
                            {allocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend verticalAlign="bottom" />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                      <div style={{fontWeight:'600'}}>AI Growth Predictor</div>
                      <div style={{fontSize:'13px', color:'#6b7280'}}>Projected value in 5 years based on extra monthly contribution</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:'18px', fontWeight:'700'}}>₹{formatNumber(projectedValue)}</div>
                      <div style={{fontSize:'13px', color:'#6b7280'}}>Current extra monthly: ₹{extra.toLocaleString('en-IN')}</div>
                    </div>
                  </div>

                  <div style={{marginTop:12}}>
                    <input type="range" min={0} max={50000} value={extra} onChange={(e) => setExtra(Number(e.target.value))} style={{width:'100%'}} />
                  </div>
                </Card>
              </>
            )}

            {screen === 'aggregator' && (
              <>
                <Card>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{fontWeight:'600'}}>Linked Accounts</div>
                    <div style={{fontSize:'13px', color:'#6b7280'}}>3 connected</div>
                  </div>

                  <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:8}}>
                    <LinkedAccount name="Axis Bank" type="Bank" status="Connected" />
                    <LinkedAccount name="Zerodha" type="Broker" status="Connected" />
                    <LinkedAccount name="Coinbase" type="Exchange" status="Manual" />
                  </div>
                </Card>

                <Card>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                      <div style={{fontWeight:'600'}}>Manual Assets</div>
                      <div style={{fontSize:'13px', color:'#6b7280'}}>Add property, gold or other offline assets</div>
                    </div>
                    <button style={{padding:'8px 12px', borderRadius:8, background:'#4F46E5', color:'#fff'}}>Add Asset</button>
                  </div>
                </Card>
              </>
            )}

            {screen === 'predictor' && (
              <Card>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:'600'}}>AI Growth Predictor</div>
                    <div style={{fontSize:'13px', color:'#6b7280'}}>5-year projection based on historical trends</div>
                  </div>
                  <div style={{fontSize:'13px', color:'#6b7280'}}>Model: Prophet + LSTM (demo)</div>
                </div>

                <div style={{marginTop:12}}>
                  <div style={{height:200}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={portfolioData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#06B6D4" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>
            )}

            {screen === 'risk' && (
              <Card>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:'600'}}>Risk & Diversification Monitor</div>
                    <div style={{fontSize:'13px', color:'#6b7280'}}>AI detects sector / asset overexposure</div>
                  </div>
                  <button style={{padding:'8px 12px', borderRadius:8, background:'#f59e0b', color:'#fff'}}>Run Analysis</button>
                </div>

                <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                  <div>
                    <div style={{fontWeight:'600', marginBottom:8}}>Top Risks</div>
                    <ul style={{fontSize:13}}>
                      <li>• Crypto concentration: 12% (suggest reduce to 6%)</li>
                      <li>• Tech sector overweight: 28% (suggest diversify)</li>
                      <li>• Low bond exposure: 8% (suggest add 5–8%)</li>
                    </ul>
                  </div>
                  <div>
                    <div style={{fontWeight:'600', marginBottom:8}}>Suggested Rebalance</div>
                    <div style={{fontSize:13}}>Shift ₹50,000 from Crypto → Bonds over 3 months</div>
                    <div style={{marginTop:12}}>
                      <button style={{padding:'8px 12px', borderRadius:8, background:'#4F46E5', color:'#fff'}}>Auto-suggest Rebalance</button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {screen === 'tax' && (
              <Card>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:'600'}}>Tax & Compliance</div>
                    <div style={{fontSize:'13px', color:'#6b7280'}}>Capital gains, dividends & ITR/1099 insights</div>
                  </div>
                  <button style={{padding:'8px 12px', borderRadius:8, background:'#10B981', color:'#fff'}}>Generate Report</button>
                </div>

                <div style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
                  <MiniStat title="Capital Gains" value="₹42,000" />
                  <MiniStat title="Dividends" value="₹6,200" />
                  <MiniStat title="Estimated Tax" value="₹9,800" />
                </div>
              </Card>
            )}

            {screen === 'news' && (
              <Card>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>
                    <div style={{fontWeight:'600'}}>News & Insights</div>
                    <div style={{fontSize:'13px', color:'#6b7280'}}>Personalized market updates</div>
                  </div>
                  <div style={{fontSize:13, color:'#10B981'}}>Sentiment: Positive</div>
                </div>

                <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:8}}>
                  <NewsItem title="Tesla Q2 beats expectations" source="Reuters" sentiment="positive" />
                  <NewsItem title="RBI signals stable rates" source="Economic Times" sentiment="neutral" />
                  <NewsItem title="Bitcoin volatility spikes" source="CoinDesk" sentiment="negative" />
                </div>
              </Card>
            )}
          </section>

          {/* Right column */}
          <aside style={{display:'flex', flexDirection:'column', gap:'24px'}}>
            <Card>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div>
                  <div style={{fontSize:'14px', color:'#6b7280'}}>Goal Progress</div>
                  <div style={{fontWeight:'600'}}>Retirement Goal</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:'16px', fontWeight:'bold'}}>₹40,00,000</div>
                  <div style={{fontSize:'14px', color:'#6b7280'}}>60% to goal</div>
                </div>
              </div>

              <div style={{marginTop:'12px', height:'8px', background:'#e5e7eb', borderRadius:'9999px', overflow:'hidden'}}>
                <div style={{width:'60%', height:'100%', background:'#4F46E5'}} />
              </div>
            </Card>

            <Card>
              <div style={{fontWeight:'600'}}>Quick Actions</div>
              <div style={{fontSize:13, color:'#6b7280', marginTop:8}}>Link accounts, export reports, add manual asset</div>
              <div style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:8}}>
                <button style={{padding:'8px', borderRadius:8, border:'1px solid #e5e7eb'}}>Link Bank</button>
                <button style={{padding:'8px', borderRadius:8, border:'1px solid #e5e7eb'}}>Sync</button>
                <button style={{padding:'8px', borderRadius:8, border:'1px solid #e5e7eb'}}>Export PDF</button>
                <button style={{padding:'8px', borderRadius:8, border:'1px solid #e5e7eb'}}>Vault</button>
              </div>
            </Card>

            <Card>
              <div style={{fontWeight:'600'}}>Vault (Blockchain)</div>
              <div style={{fontSize:13, color:'#6b7280', marginTop:8}}>Encrypted storage for KYC, tax & proofs</div>
              <div style={{marginTop:12, display:'flex', gap:8}}>
                <button style={{padding:'8px 12px', borderRadius:8, background:'#0ea5e9', color:'#fff'}}>Open Vault</button>
                <button style={{padding:'8px 12px', borderRadius:8, border:'1px solid #e5e7eb'}}>Upload Doc</button>
              </div>
            </Card>

            <Card>
              <div style={{fontWeight:'600'}}>Notifications</div>
              <div style={{fontSize:13, color:'#6b7280', marginTop:8}}>3 new alerts</div>
              <ul style={{marginTop:12, fontSize:13}}>
                <li>• Tax filing deadline in 7 days</li>
                <li>• Crypto volatility alert</li>
                <li>• Portfolio value up 2.4% today</li>
              </ul>
            </Card>
          </aside>
        </motion.div>

      </main>
    </div>
  )
}

// --- Helper components ---
function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div onClick={onClick} style={{display:'flex', alignItems:'center', gap:'12px', padding:'8px', borderRadius:'6px', cursor:'pointer', background: active ? '#EEF2FF' : '#fff'}}>
      <div style={{width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', color:'#4F46E5'}}>{icon}</div>
      <div style={{fontSize:'14px', fontWeight: active ? '600' : '400', color: active ? '#111827' : '#374151'}}>{label}</div>
    </div>
  )
}

function Card({ children }) {
  return (
    <div style={{background:'#fff', padding:'16px', borderRadius:'16px', boxShadow:'0 1px 2px rgba(0,0,0,0.05)', border:'1px solid #e5e7eb'}}>{children}</div>
  )
}

function MiniStat({ title, value }) {
  return (
    <div style={{background:'#f8fafc', padding:12, borderRadius:8}}>
      <div style={{fontSize:12, color:'#6b7280'}}>{title}</div>
      <div style={{fontWeight:'600'}}>{value}</div>
    </div>
  )
}

function LinkedAccount({ name, type, status }) {
  return (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:12, background:'#f8fafc', borderRadius:8}}>
      <div>
        <div style={{fontWeight:'600'}}>{name}</div>
        <div style={{fontSize:13, color:'#6b7280'}}>{type}</div>
      </div>
      <div style={{fontSize:13, color:'#374151'}}>{status}</div>
    </div>
  )
}

function NewsItem({ title, source, sentiment }) {
  const color = sentiment === 'positive' ? '#10B981' : sentiment === 'negative' ? '#ef4444' : '#6b7280'
  return (
    <div style={{padding:12, background:'#f8fafc', borderRadius:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <div>
        <div style={{fontWeight:'600'}}>{title}</div>
        <div style={{fontSize:13, color:'#6b7280'}}>{source}</div>
      </div>
      <div style={{color, fontWeight:600, fontSize:13}}>{sentiment}</div>
    </div>
  )
}

function formatNumber(n) {
  return n.toLocaleString('en-IN')
}
