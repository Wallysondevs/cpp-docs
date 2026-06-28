# Funções matemáticas especiais (desde C++17)

A biblioteca de Funções Matemáticas Especiais foi originalmente parte da Biblioteca TR1 ISO/IEC TR 19768:2007, depois publicada como um padrão ISO independente, ISO/IEC 29124:2010, e finalmente incorporada ao ISO C++ a partir do C++17.

Veja [Funções matemáticas especiais](<#/doc/experimental/special_math>) para a versão ISO/IEC 29124:2010 desta biblioteca.

### Funções

Definido no header `[<cmath>](<#/doc/header/cmath>)`
---
[ assoc_laguerreassoc_laguerrefassoc_laguerrel](<#/doc/numeric/special_functions/assoc_laguerre>)(C++17)(C++17)(C++17) | polinômios de Laguerre associados
(função)
[ assoc_legendreassoc_legendrefassoc_legendrel](<#/doc/numeric/special_functions/assoc_legendre>)(C++17)(C++17)(C++17) | polinômios de Legendre associados
(função)
[ betabetafbetal](<#/doc/numeric/special_functions/beta>)(C++17)(C++17)(C++17) | função beta
(função)
[ comp_ellint_1comp_ellint_1fcomp_ellint_1l](<#/doc/numeric/special_functions/comp_ellint_1>)(C++17)(C++17)(C++17) | integral elíptica (completa) de primeira espécie
(função)
[ comp_ellint_2comp_ellint_2fcomp_ellint_2l](<#/doc/numeric/special_functions/comp_ellint_2>)(C++17)(C++17)(C++17) | integral elíptica (completa) de segunda espécie
(função)
[ comp_ellint_3comp_ellint_3fcomp_ellint_3l](<#/doc/numeric/special_functions/comp_ellint_3>)(C++17)(C++17)(C++17) | integral elíptica (completa) de terceira espécie
(função)
[ cyl_bessel_icyl_bessel_ifcyl_bessel_il](<#/doc/numeric/special_functions/cyl_bessel_i>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas modificadas regulares
(função)
[ cyl_bessel_jcyl_bessel_jfcyl_bessel_jl](<#/doc/numeric/special_functions/cyl_bessel_j>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas (de primeira espécie)
(função)
[ cyl_bessel_kcyl_bessel_kfcyl_bessel_kl](<#/doc/numeric/special_functions/cyl_bessel_k>)(C++17)(C++17)(C++17) | funções de Bessel cilíndricas modificadas irregulares
(função)
[ cyl_neumanncyl_neumannfcyl_neumannl](<#/doc/numeric/special_functions/cyl_neumann>)(C++17)(C++17)(C++17) | funções de Neumann cilíndricas
(função)
[ ellint_1ellint_1fellint_1l](<#/doc/numeric/special_functions/ellint_1>)(C++17)(C++17)(C++17) | integral elíptica (incompleta) de primeira espécie
(função)
[ ellint_2ellint_2fellint_2l](<#/doc/numeric/special_functions/ellint_2>)(C++17)(C++17)(C++17) | integral elíptica (incompleta) de segunda espécie
(função)
[ ellint_3ellint_3fellint_3l](<#/doc/numeric/special_functions/ellint_3>)(C++17)(C++17)(C++17) | integral elíptica (incompleta) de terceira espécie
(função)
[ expintexpintfexpintl](<#/doc/numeric/special_functions/expint>)(C++17)(C++17)(C++17) | integral exponencial
(função)
[ hermitehermitefhermitel](<#/doc/numeric/special_functions/hermite>)(C++17)(C++17)(C++17) | polinômios de Hermite
(função)
[ legendrelegendreflegendrel](<#/doc/numeric/special_functions/legendre>)(C++17)(C++17)(C++17) | polinômios de Legendre
(função)
[ laguerrelaguerreflaguerrel](<#/doc/numeric/special_functions/laguerre>)(C++17)(C++17)(C++17) | polinômios de Laguerre
(função)
[ riemann_zetariemann_zetafriemann_zetal](<#/doc/numeric/special_functions/riemann_zeta>)(C++17)(C++17)(C++17) | função zeta de Riemann
(função)
[ sph_besselsph_besselfsph_bessell](<#/doc/numeric/special_functions/sph_bessel>)(C++17)(C++17)(C++17) | funções de Bessel esféricas (de primeira espécie)
(função)
[ sph_legendresph_legendrefsph_legendrel](<#/doc/numeric/special_functions/sph_legendre>)(C++17)(C++17)(C++17) | funções de Legendre associadas esféricas
(função)
[ sph_neumannsph_neumannfsph_neumannl](<#/doc/numeric/special_functions/sph_neumann>)(C++17)(C++17)(C++17) | funções de Neumann esféricas
(função)

### Notas

As sobrecargas para float e long double para funções matemáticas especiais sem o sufixo "`f`" ou "`l`" estão presentes no rascunho final da ISO/IEC 29124:2010 ([N3060](<https://wg21.link/N3060>)), mas ausentes no padrão C++17/20 publicado (veja [LWG issue 3234](<https://cplusplus.github.io/LWG/issue3234>)). Essas sobrecargas não foram fornecidas pela MSVC STL até o VS 2022 17.3.

Essas funções não estão relacionadas às [funções membro especiais](<#/doc/language/member_functions>) de tipos de classe.

Teste de recurso macro | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_math_special_functions`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | [Funções matemáticas especiais](<#/doc/numeric/special_functions>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3234](<https://cplusplus.github.io/LWG/issue3234>)
([P1467R9](<https://wg21.link/P1467R9>)) | C++17 | sobrecargas adicionais para funções matemáticas especiais estavam faltando | essas sobrecargas são necessárias

### Referências

*   Padrão C++23 (ISO/IEC 14882:2024):

    *   28.7.6 Funções matemáticas especiais [sf.cmath]

*   Padrão C++20 (ISO/IEC 14882:2020):

    *   26.8.6 Funções matemáticas especiais [sf.cmath]

*   Padrão C++17 (ISO/IEC 14882:2017):

    *   29.9.5 Funções matemáticas especiais [sf.cmath]
