import ThemeCustomization from "./themes";
import Routes from './routes';

function App() {

  return(
    <ThemeCustomization>
      <Routes />
    </ThemeCustomization>
  )

  // if you using basic routes layout use this format
  //-------------------------------------------------
  // return (
  //   <Routes>
  //     <Route path="/" element={<Layout />}>
  //       {/* public routes */}
  //       <Route path="login" element={<Login />} />
  //       <Route path="register" element={<Register />} />
  //       <Route path="unauthorized" element={<Unauthorized />} />

  //       {/* we want to protect these routes */}
  //       <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
  //         <Route path="/" element={<Home />} />
  //       </Route>

  //       <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
  //         <Route path="admin" element={<Admin />} />
  //       </Route>

  //       {/* catch all */}
  //       <Route path="*" element={<Missing />} />
  //     </Route>
  //   </Routes>
  // );
}

export default App;