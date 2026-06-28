# Funções matemáticas especiais

A biblioteca de Funções Matemáticas Especiais, ISO/IEC 29124:2010, especifica extensões para a standard library do C++ que incluem funções matemáticas especiais (originalmente parte do ISO/IEC TR 19768:2007).

Estas funções especiais nesta biblioteca são implementadas em [boost.math](<https://www.boost.org/doc/libs/release/libs/math/doc/html/special.html>), que está atualmente disponível em mais compiladores e plataformas do que as implementações deste padrão. No momento desta escrita (1/2016), o único compilador que anunciou suporte direto é o gcc, para a versão 6.1.

### Funções não-membro

Definidas no header `[<cmath>](<#/doc/header/cmath>)`
---
[ assoc_laguerreassoc_laguerrefassoc_laguerrel](<#/doc/experimental/special_functions/assoc_laguerre>) | polinômios de Laguerre associados
(function)
[ assoc_legendreassoc_legendrefassoc_legendrel](<#/doc/experimental/special_functions/assoc_legendre>) | polinômios de Legendre associados
(function)
[ betabetafbetal](<#/doc/experimental/special_functions/beta>) | função beta
(function)
[ comp_ellint_1comp_ellint_1fcomp_ellint_1l](<#/doc/experimental/special_functions/comp_ellint_1>) | integral elíptica (completa) de primeira espécie
(function)
[ comp_ellint_2comp_ellint_2fcomp_ellint_2l](<#/doc/experimental/special_functions/comp_ellint_2>) | integral elíptica (completa) de segunda espécie
(function)
[ comp_ellint_3comp_ellint_3fcomp_ellint_3l](<#/doc/experimental/special_functions/comp_ellint_3>) | integral elíptica (completa) de terceira espécie
(function)
[ cyl_bessel_icyl_bessel_ifcyl_bessel_il](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_functions/cyl_bessel_i&action=edit&redlink=1> "cpp/experimental/special functions/cyl bessel i \(page does not exist\)") | funções de Bessel cilíndricas modificadas regulares
(function)
[ cyl_bessel_jcyl_bessel_jfcyl_bessel_jl](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_math/cyl_bessel_j&action=edit&redlink=1> "cpp/experimental/special math/cyl bessel j \(page does not exist\)") | funções de Bessel cilíndricas (de primeira espécie)
(function)
[ cyl_bessel_kcyl_bessel_kfcyl_bessel_kl](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_functions/cyl_bessel_k&action=edit&redlink=1> "cpp/experimental/special functions/cyl bessel k \(page does not exist\)") | funções de Bessel cilíndricas modificadas irregulares
(function)
[ cyl_neumanncyl_neumannfcyl_neumannl](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_functions/cyl_neumann&action=edit&redlink=1> "cpp/experimental/special functions/cyl neumann \(page does not exist\)") | funções de Neumann cilíndricas
(function)
[ ellint_1ellint_1fellint_1l](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_functions/ellint_1&action=edit&redlink=1> "cpp/experimental/special functions/ellint 1 \(page does not exist\)") | integral elíptica (incompleta) de primeira espécie
(function)
[ ellint_2ellint_2fellint_2l](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_functions/ellint_2&action=edit&redlink=1> "cpp/experimental/special functions/ellint 2 \(page does not exist\)") | integral elíptica (incompleta) de segunda espécie
(function)
[ ellint_3ellint_3fellint_3l](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_functions/ellint_3&action=edit&redlink=1> "cpp/experimental/special functions/ellint 3 \(page does not exist\)") | integral elíptica (incompleta) de terceira espécie
(function)
[ expintexpintfexpintl](<#/doc/experimental/special_functions/expint>) | integral exponencial
(function)
[ hermitehermitefhermitel](<#/doc/experimental/special_functions/hermite>) | polinômios de Hermite
(function)
[ legendrelegendreflegendrel](<#/doc/experimental/special_functions/legendre>) | polinômios de Legendre
(function)
[ laguerrelaguerreflaguerrel](<#/doc/experimental/special_functions/laguerre>) | polinômios de Laguerre
(function)
[ riemann_zetariemann_zetafriemann_zetal](<#/doc/experimental/special_functions/riemann_zeta>) | função zeta de Riemann
(function)
[ sph_besselsph_besselfsph_bessell](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_math/sph_bessel&action=edit&redlink=1> "cpp/experimental/special math/sph bessel \(page does not exist\)") | funções de Bessel esféricas (de primeira espécie)
(function)
[ sph_legendresph_legendrefsph_legendrel](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_functions/sph_legendre&action=edit&redlink=1> "cpp/experimental/special functions/sph legendre \(page does not exist\)") | funções de Legendre associadas esféricas
(function)
[ sph_neumannsph_neumannfsph_neumannl](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/special_functions/sph_neumann&action=edit&redlink=1> "cpp/experimental/special functions/sph neumann \(page does not exist\)") | funções de Neumann esféricas
(function)

### Macros

__STDCPP_MATH_SPEC_FUNCS__ | um valor de pelo menos 201003L indica que ISO/IEC 29124:2010 é suportado
(constante de macro)