# Histórico do C++

## C++ Inicial
  
  * 1979: C with Classes implementado pela primeira vez

  1. Novos recursos: [classes](<#/doc/language/classes>), [funções membro](<#/doc/language/member_functions>), [classes derivadas](<#/doc/language/derived_class>), compilação separada, [controle de acesso público e privado](<#/doc/language/access>), [friends](<#/doc/language/friend>), verificação de tipo de argumentos de função, [argumentos padrão](<#/doc/language/default_arguments>), [funções inline](<#/doc/language/inline>), [operador de atribuição sobrecarregado](<#/doc/language/as_operator>), [construtores](<#/doc/language/initializer_list>), [destrutores](<#/doc/language/destructor>), f() o mesmo que f(void), call-function e return-function (recursos de sincronização, não no C++)
  2. Bibliotecas: a biblioteca de tarefas concorrentes (não no C++)

  * 1982: Manual de referência do C with Classes publicado
  * 1984: C84 implementado, manual de referência publicado
  * 1985: Cfront 1.0

  1. Novos recursos: [funções virtuais](<#/doc/language/virtual>), sobrecarga de função e [operador](<#/doc/language/operators>), [referências](<#/doc/language/reference>), operadores [`new`](<#/doc/memory/new/operator_new>) e [`delete`](<#/doc/memory/new/operator_delete>), [a palavra-chave `const`](<#/doc/language/cv>), operador de resolução de escopo
  2. Adições à biblioteca: [número complexo](<#/doc/numeric/complex>), `string` (versão AT&T), [I/O stream](<#/doc/header/iostream>)

  * 1985: The C++ Programming Language, 1ª edição
  * 1986: O artigo "whatis?" documentando os objetivos de design restantes, incluindo herança múltipla, tratamento de exceções e templates.
  * 1987: Suporte a C++ no GCC 1.15.3
  * 1989: Cfront 2.0

  1. Novos recursos: [herança múltipla](<#/doc/language/derived_class>), [ponteiros para membros](<#/doc/language/pointer>), [acesso protegido](<#/doc/language/access>), ligação (linkage) com segurança de tipo, [classes abstratas](<#/doc/language/abstract_class>), funções membro [`static`](<#/doc/language/static>) e [`const-qualified`](<#/doc/language/member_functions>), [`new`](<#/doc/memory/new/operator_new>) e [`delete`](<#/doc/memory/new/operator_delete>) específicos de classe
  2. Adições à biblioteca: [manipuladores de E/S](<#/doc/io/manip>)

  * 1990: The Annotated C++ Reference Manual

Este livro descreveu a linguagem como projetada, incluindo alguns recursos que ainda não haviam sido implementados. Ele serviu como o padrão de fato até a ISO.

  1. Novos recursos: [namespaces](<#/doc/language/namespace>), [tratamento de exceções](<#/doc/language/exceptions>), [classes aninhadas](<#/doc/language/nested_classes>), [templates](<#/doc/language/templates>)

  * 1991: Cfront 3.0
  * 1991: The C++ Programming Language, 2ª edição

## C++ Padrão

  * 1990: Comitê ANSI C++ fundado
  * 1991: Comitê ISO C++ fundado
  * 1992: [STL](<https://www.rrsd.com/software_development/stl/stl/>) implementada em C++

### Período C++98/03

  * 1998: **C++98** (ISO/IEC 14882:1998)

  1. Novos recursos: RTTI ([`dynamic_cast`](<#/doc/language/dynamic_cast>), [`typeid`](<#/doc/language/typeid>)), [tipos de retorno covariantes](<#/doc/language/virtual>), [operadores de cast](<#/doc/language/cast_operator>), [`mutable`](<#/doc/language/cv>), [`bool`](<#/doc/language/types>), declarações em condições, [instanciações de template](<#/doc/language/templates>), [templates de membro](<#/doc/language/member_template>), export
  2. Adições à biblioteca: [locales](<#/doc/locale>), [`bitset`](<#/doc/utility/bitset>), [`valarray`](<#/doc/numeric/valarray>), [`auto_ptr`](<#/doc/memory/auto_ptr>), [string com template](<#/doc/string/basic_string>), [I/O streams](<#/doc/io>), e [números complexos](<#/doc/numeric/complex>).
  3. Baseado na STL: [contêineres](<#/doc/container>), [algoritmos](<#/doc/algorithm>), [iteradores](<#/doc/iterator>), [objetos de função](<#/doc/utility/functional>)

  * 1998: The C++ Programming Language, 3ª edição
  * 1999: [Boost](<https://www.boost.org>) fundado pelos membros do comitê para produzir novas bibliotecas candidatas de alta qualidade para o padrão.
  * 2003: **C++03** (ISO/IEC 14882:2003)

Esta foi uma revisão menor, destinada a ser pouco mais do que um corrigendum técnico. Esta revisão introduz a definição de [inicialização por valor](<#/doc/language/value_initialization>).

Relatórios de Defeitos corrigidos no C++03 (92 no core, 125 na biblioteca)
---
  
  * [CWG#1](<https://wg21.cmeerw.net/cwg/issue1>)
  * [CWG#20](<https://wg21.cmeerw.net/cwg/issue20>)
  * [CWG#21](<https://wg21.cmeerw.net/cwg/issue21>)
  * [CWG#22](<https://wg21.cmeerw.net/cwg/issue22>)
  * [CWG#24](<https://wg21.cmeerw.net/cwg/issue24>)
  * [CWG#25](<https://wg21.cmeerw.net/cwg/issue25>)
  * [CWG#30](<https://wg21.cmeerw.net/cwg/issue30>)
  * [CWG#32](<https://wg21.cmeerw.net/cwg/issue32>)
  * [CWG#33](<https://wg21.cmeerw.net/cwg/issue33>)
  * [CWG#35](<https://wg21.cmeerw.net/cwg/issue35>)
  * [CWG#38](<https://wg21.cmeerw.net/cwg/issue38>)
  * [CWG#40](<https://wg21.cmeerw.net/cwg/issue40>)
  * [CWG#41](<https://wg21.cmeerw.net/cwg/issue41>)
  * [CWG#43](<https://wg21.cmeerw.net/cwg/issue43>)
  * [CWG#48](<https://wg21.cmeerw.net/cwg/issue48>)
  * [CWG#49](<https://wg21.cmeerw.net/cwg/issue49>)
  * [CWG#51](<https://wg21.cmeerw.net/cwg/issue51>)
  * [CWG#52](<https://wg21.cmeerw.net/cwg/issue52>)
  * [CWG#53](<https://wg21.cmeerw.net/cwg/issue53>)
  * [CWG#56](<https://wg21.cmeerw.net/cwg/issue56>)
  * [CWG#59](<https://wg21.cmeerw.net/cwg/issue59>)
  * [CWG#64](<https://wg21.cmeerw.net/cwg/issue64>)
  * [CWG#65](<https://wg21.cmeerw.net/cwg/issue65>)
  * [CWG#67](<https://wg21.cmeerw.net/cwg/issue67>)
  * [CWG#68](<https://wg21.cmeerw.net/cwg/issue68>)
  * [CWG#69](<https://wg21.cmeerw.net/cwg/issue69>)
  * [CWG#73](<https://wg21.cmeerw.net/cwg/issue73>)
  * [CWG#74](<https://wg21.cmeerw.net/cwg/issue74>)
  * [CWG#75](<https://wg21.cmeerw.net/cwg/issue75>)
  * [CWG#76](<https://wg21.cmeerw.net/cwg/issue76>)
  * [CWG#80](<https://wg21.cmeerw.net/cwg/issue80>)
  * [CWG#83](<https://wg21.cmeerw.net/cwg/issue83>)
  * [CWG#84](<https://wg21.cmeerw.net/cwg/issue84>)
  * [CWG#85](<https://wg21.cmeerw.net/cwg/issue85>)
  * [CWG#89](<https://wg21.cmeerw.net/cwg/issue89>)
  * [CWG#90](<https://wg21.cmeerw.net/cwg/issue90>)
  * [CWG#93](<https://wg21.cmeerw.net/cwg/issue93>)
  * [CWG#94](<https://wg21.cmeerw.net/cwg/issue94>)
  * [CWG#98](<https://wg21.cmeerw.net/cwg/issue98>)
  * [CWG#100](<https://wg21.cmeerw.net/cwg/issue100>)
  * [CWG#101](<https://wg21.cmeerw.net/cwg/issue101>)
  * [CWG#103](<https://wg21.cmeerw.net/cwg/issue103>)
  * [CWG#105](<https://wg21.cmeerw.net/cwg/issue105>)
  * [CWG#108](<https://wg21.cmeerw.net/cwg/issue108>)
  * [CWG#116](<https://wg21.cmeerw.net/cwg/issue116>)
  * [CWG#120](<https://wg21.cmeerw.net/cwg/issue120>)
  * [CWG#121](<https://wg21.cmeerw.net/cwg/issue121>)
  * [CWG#123](<https://wg21.cmeerw.net/cwg/issue123>)
  * [CWG#126](<https://wg21.cmeerw.net/cwg/issue126>)
  * [CWG#127](<https://wg21.cmeerw.net/cwg/issue127>)
  * [CWG#128](<https://wg21.cmeerw.net/cwg/issue128>)
  * [CWG#131](<https://wg21.cmeerw.net/cwg/issue131>)
  * [CWG#134](<https://wg21.cmeerw.net/cwg/issue134>)
  * [CWG#135](<https://wg21.cmeerw.net/cwg/issue135>)
  * [CWG#137](<https://wg21.cmeerw.net/cwg/issue137>)
  * [CWG#142](<https://wg21.cmeerw.net/cwg/issue142>)
  * [CWG#145](<https://wg21.cmeerw.net/cwg/issue145>)
  * [CWG#147](<https://wg21.cmeerw.net/cwg/issue147>)
  * [CWG#148](<https://wg21.cmeerw.net/cwg/issue148>)
  * [CWG#149](<https://wg21.cmeerw.net/cwg/issue149>)
  * [CWG#151](<https://wg21.cmeerw.net/cwg/issue151>)
  * [CWG#152](<https://wg21.cmeerw.net/cwg/issue152>)
  * [CWG#153](<https://wg21.cmeerw.net/cwg/issue153>)
  * [CWG#159](<https://wg21.cmeerw.net/cwg/issue159>)
  * [CWG#161](<https://wg21.cmeerw.net/cwg/issue161>)
  * [CWG#163](<https://wg21.cmeerw.net/cwg/issue163>)
  * [CWG#164](<https://wg21.cmeerw.net/cwg/issue164>)
  * [CWG#166](<https://wg21.cmeerw.net/cwg/issue166>)
  * [CWG#171](<https://wg21.cmeerw.net/cwg/issue171>)
  * [CWG#173](<https://wg21.cmeerw.net/cwg/issue173>)
  * [CWG#176](<https://wg21.cmeerw.net/cwg/issue176>)
  * [CWG#178](<https://wg21.cmeerw.net/cwg/issue178>)
  * [CWG#179](<https://wg21.cmeerw.net/cwg/issue179>)
  * [CWG#181](<https://wg21.cmeerw.net/cwg/issue181>)
  * [CWG#183](<https://wg21.cmeerw.net/cwg/issue183>)
  * [CWG#185](<https://wg21.cmeerw.net/cwg/issue185>)
  * [CWG#187](<https://wg21.cmeerw.net/cwg/issue187>)
  * [CWG#188](<https://wg21.cmeerw.net/cwg/issue188>)
  * [CWG#190](<https://wg21.cmeerw.net/cwg/issue190>)
  * [CWG#193](<https://wg21.cmeerw.net/cwg/issue193>)
  * [CWG#194](<https://wg21.cmeerw.net/cwg/issue194>)
  * [CWG#202](<https://wg21.cmeerw.net/cwg/issue202>)
  * [CWG#206](<https://wg21.cmeerw.net/cwg/issue206>)
  * [CWG#210](<https://wg21.cmeerw.net/cwg/issue210>)
  * [CWG#213](<https://wg21.cmeerw.net/cwg/issue213>)
  * [CWG#217](<https://wg21.cmeerw.net/cwg/issue217>)
  * [CWG#227](<https://wg21.cmeerw.net/cwg/issue227>)
  * [CWG#235](<https://wg21.cmeerw.net/cwg/issue235>)
  * [CWG#241](<https://wg21.cmeerw.net/cwg/issue241>)
  * [CWG#249](<https://wg21.cmeerw.net/cwg/issue249>)
  * [CWG#250](<https://wg21.cmeerw.net/cwg/issue250>)
  * [CWG#304](<https://wg21.cmeerw.net/cwg/issue304>)

  * [LWG#1](<http://wg21.link/lwg1>)
  * [LWG#3](<http://wg21.link/lwg3>)
  * [LWG#5](<http://wg21.link/lwg5>)
  * [LWG#7](<http://wg21.link/lwg7>)
  * [LWG#8](<http://wg21.link/lwg8>)
  * [LWG#9](<http://wg21.link/lwg9>)
  * [LWG#11](<http://wg21.link/lwg11>)
  * [LWG#13](<http://wg21.link/lwg13>)
  * [LWG#14](<http://wg21.link/lwg14>)
  * [LWG#15](<http://wg21.link/lwg15>)
  * [LWG#16](<http://wg21.link/lwg16>)
  * [LWG#17](<http://wg21.link/lwg17>)
  * [LWG#18](<http://wg21.link/lwg18>)
  * [LWG#19](<http://wg21.link/lwg19>)
  * [LWG#20](<http://wg21.link/lwg20>)
  * [LWG#21](<http://wg21.link/lwg21>)
  * [LWG#22](<http://wg21.link/lwg22>)
  * [LWG#24](<http://wg21.link/lwg24>)
  * [LWG#25](<http://wg21.link/lwg25>)
  * [LWG#26](<http://wg21.link/lwg26>)
  * [LWG#27](<http://wg21.link/lwg27>)
  * [LWG#28](<http://wg21.link/lwg28>)
  * [LWG#29](<http://wg21.link/lwg29>)
  * [LWG#30](<http://wg21.link/lwg30>)
  * [LWG#31](<http://wg21.link/lwg31>)
  * [LWG#32](<http://wg21.link/lwg32>)
  * [LWG#33](<http://wg21.link/lwg33>)
  * [LWG#34](<http://wg21.link/lwg34>)
  * [LWG#35](<http://wg21.link/lwg35>)
  * [LWG#36](<http://wg21.link/lwg36>)
  * [LWG#37](<http://wg21.link/lwg37>)
  * [LWG#38](<http://wg21.link/lwg38>)
  * [LWG#39](<http://wg21.link/lwg39>)
  * [LWG#40](<http://wg21.link/lwg40>)
  * [LWG#41](<http://wg21.link/lwg41>)
  * [LWG#42](<http://wg21.link/lwg42>)
  * [LWG#46](<http://wg21.link/lwg46>)
  * [LWG#47](<http://wg21.link/lwg47>)
  * [LWG#48](<http://wg21.link/lwg48>)
  * [LWG#50](<http://wg21.link/lwg50>)
  * [LWG#51](<http://wg21.link/lwg51>)
  * [LWG#52](<http://wg21.link/lwg52>)
  * [LWG#53](<http://wg21.link/lwg53>)
  * [LWG#54](<http://wg21.link/lwg54>)
  * [LWG#55](<http://wg21.link/lwg55>)
  * [LWG#56](<http://wg21.link/lwg56>)
  * [LWG#57](<http://wg21.link/lwg57>)
  * [LWG#59](<http://wg21.link/lwg59>)
  * [LWG#60](<http://wg21.link/lwg60>)
  * [LWG#61](<http://wg21.link/lwg61>)
  * [LWG#62](<http://wg21.link/lwg62>)
  * [LWG#63](<http://wg21.link/lwg63>)
  * [LWG#64](<http://wg21.link/lwg64>)
  * [LWG#66](<http://wg21.link/lwg66>)
  * [LWG#68](<http://wg21.link/lwg68>)
  * [LWG#69](<http://wg21.link/lwg69>)
  * [LWG#70](<http://wg21.link/lwg70>)
  * [LWG#71](<http://wg21.link/lwg71>)
  * [LWG#74](<http://wg21.link/lwg74>)
  * [LWG#75](<http://wg21.link/lwg75>)
  * [LWG#78](<http://wg21.link/lwg78>)
  * [LWG#79](<http://wg21.link/lwg79>)
  * [LWG#80](<http://wg21.link/lwg80>)
  * [LWG#83](<http://wg21.link/lwg83>)
  * [LWG#86](<http://wg21.link/lwg86>)
  * [LWG#90](<http://wg21.link/lwg90>)
  * [LWG#106](<http://wg21.link/lwg106>)
  * [LWG#108](<http://wg21.link/lwg108>)
  * [LWG#110](<http://wg21.link/lwg110>)
  * [LWG#112](<http://wg21.link/lwg112>)
  * [LWG#114](<http://wg21.link/lwg114>)
  * [LWG#115](<http://wg21.link/lwg115>)
  * [LWG#119](<http://wg21.link/lwg119>)
  * [LWG#122](<http://wg21.link/lwg122>)
  * [LWG#124](<http://wg21.link/lwg124>)
  * [LWG#125](<http://wg21.link/lwg125>)
  * [LWG#126](<http://wg21.link/lwg126>)
  * [LWG#127](<http://wg21.link/lwg127>)
  * [LWG#129](<http://wg21.link/lwg129>)
  * [LWG#132](<http://wg21.link/lwg132>)
  * [LWG#133](<http://wg21.link/lwg133>)
  * [LWG#134](<http://wg21.link/lwg134>)
  * [LWG#137](<http://wg21.link/lwg137>)
  * [LWG#139](<http://wg21.link/lwg139>)
  * [LWG#141](<http://wg21.link/lwg141>)
  * [LWG#142](<http://wg21.link/lwg142>)
  * [LWG#144](<http://wg21.link/lwg144>)
  * [LWG#146](<http://wg21.link/lwg146>)
  * [LWG#147](<http://wg21.link/lwg147>)
  * [LWG#148](<http://wg21.link/lwg148>)
  * [LWG#150](<http://wg21.link/lwg150>)
  * [LWG#151](<http://wg21.link/lwg151>)
  * [LWG#152](<http://wg21.link/lwg152>)
  * [LWG#154](<http://wg21.link/lwg154>)
  * [LWG#155](<http://wg21.link/lwg155>)
  * [LWG#156](<http://wg21.link/lwg156>)
  * [LWG#158](<http://wg21.link/lwg158>)
  * [LWG#159](<http://wg21.link/lwg159>)
  * [LWG#160](<http://wg21.link/lwg160>)
  * [LWG#161](<http://wg21.link/lwg161>)
  * [LWG#164](<http://wg21.link/lwg164>)
  * [LWG#168](<http://wg21.link/lwg168>)
  * [LWG#169](<http://wg21.link/lwg169>)
  * [LWG#170](<http://wg21.link/lwg170>)
  * [LWG#172](<http://wg21.link/lwg172>)
  * [LWG#173](<http://wg21.link/lwg173>)
  * [LWG#174](<http://wg21.link/lwg174>)
  * [LWG#175](<http://wg21.link/lwg175>)
  * [LWG#176](<http://wg21.link/lwg176>)
  * [LWG#181](<http://wg21.link/lwg181>)
  * [LWG#189](<http://wg21.link/lwg189>)
  * [LWG#193](<http://wg21.link/lwg193>)
  * [LWG#195](<http://wg21.link/lwg195>)
  * [LWG#199](<http://wg21.link/lwg199>)
  * [LWG#208](<http://wg21.link/lwg208>)
  * [LWG#209](<http://wg21.link/lwg209>)
  * [LWG#210](<http://wg21.link/lwg210>)
  * [LWG#211](<http://wg21.link/lwg211>)
  * [LWG#212](<http://wg21.link/lwg212>)
  * [LWG#217](<http://wg21.link/lwg217>)
  * [LWG#220](<http://wg21.link/lwg220>)
  * [LWG#222](<http://wg21.link/lwg222>)
  * [LWG#223](<http://wg21.link/lwg223>)
  * [LWG#224](<http://wg21.link/lwg224>)
  * [LWG#227](<http://wg21.link/lwg227>)

  
  
  * 2006: Performance TR (ISO/IEC TR 18015:2006) ([ISO Store](<https://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=43351>)) ([2006 draft](<https://www.open-std.org/jtc1/sc22/wg21/docs/TR18015.pdf>))

Este TR discutiu os custos de várias abstrações C++, forneceu orientação de implementação, discutiu o uso de C++ em sistemas embarcados e introduziu a interface `<hardware>` para o `<iohw.h>` do ISO/IEC TR 18037:2008 do C.

  * 2007: Library extension TR1 (ISO/IEC TR 19768:2007) ([ISO store](<https://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=43289>)) ([2005 draft](<https://wg21.link/n1745>)).

Este TR é uma extensão da biblioteca C++, que adiciona o seguinte à biblioteca padrão C++:

  1. Do Boost: [`reference_wrapper`](<#/doc/utility/functional/reference_wrapper>), [ponteiros inteligentes](<#/doc/memory>), [função membro](<#/doc/utility/functional/mem_fn>), [`result_of`](<#/doc/types/result_of>), [`bind`](<#/doc/utility/functional/bind>), [`function`](<#/doc/utility/functional/function>), [Type Traits](<#/doc/types>), [Aleatório](<#/doc/numeric/random>), Funções Matemáticas Especiais, [`tuple`](<#/doc/utility/tuple>), [`array`](<#/doc/container/array>), [Contêineres Não Ordenados](<#/doc/container>) (incluindo [`hash`](<#/doc/utility/hash>)), e [Expressões Regulares](<#/doc/regex>).
  2. Do C99: funções matemáticas de [`<math.h>`](<#/>) que eram novas no C99, [classe de caractere em branco](<#/doc/string/byte/isblank>), [ambiente de ponto flutuante](<#/doc/numeric/fenv>), manipulador de E/S [`hexfloat`](<#/doc/io/manip/fixed>), [tipos integrais de tamanho fixo](<#/doc/types/integer>), o tipo [`long long`](<#/doc/language/types>), [va_copy](<#/doc/utility/variadic/va_copy>), as famílias de funções [`snprintf()`](<#/doc/io/c/snprintf>) e [`vfscanf()`](<#/doc/io/c/vfscanf>), e os especificadores de conversão C99 para as famílias de funções [`printf()`](<#/doc/io/c/printf>) e [`scanf()`](<#/doc/io/c/scanf>).

Todo o TR1, exceto as funções especiais, foi incluído no C++11, com pequenas alterações.

  * 2010: Funções matemáticas especiais (ISO/IEC 29124:2010) ([ISO Store](<https://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=50511>)) ([2010 draft](<https://wg21.link/n3060>))

Este padrão internacional é uma extensão da biblioteca padrão C++, que adiciona as funções especiais que faziam parte do TR1, mas não foram incluídas no C++11: integrais elípticas, integral exponencial, polinômios de Laguerre, polinômios de Legendre, polinômios de Hermite, funções de Bessel, funções de Neumann, função beta e função zeta de Riemann. Este padrão foi [mesclado ao C++17](<#/doc/numeric/special_functions>).

### Período C++11

  * 2011: **C++11** (ISO/IEC 14882:2011) ([ISO Store](<https://www.iso.org/iso/iso_catalogue/catalogue_tc/catalogue_detail.htm?csnumber=50372>)) ([2012 post-publication draft](<https://wg21.link/n3337>)).

[Artigo Principal: C++11](<#/doc/11>)

Um grande número de mudanças foi introduzido tanto para padronizar práticas existentes quanto para melhorar as abstrações disponíveis para os programadores C++

  * 2011: Decimal floating-point TR (ISO/IEC TR 24733:2011) ([ISO Store](<https://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=38843>)) ([2009 draft](<https://wg21.link/n2849>))

Este TR implementa os tipos de ponto flutuante decimal do Padrão IEEE 754-2008 para Aritmética de Ponto Flutuante: `std::decimal::decimal32`, `std::decimal::decimal64` e `std::decimal::decimal128`.

  * 2012: [The Standard C++ Foundation](<https://isocpp.org>) fundada
  * 2013: The C++ Programming Language, 4ª edição

### Período C++14

  * 2014: **C++14** ([ISO Store](<https://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=64029>)) ([ANSI Store](<https://webstore.ansi.org/RecordDetail.aspx?sku=INCITS%2fISO%2fIEC+14882%3a2014+\(2016\)>)) ([2014 final draft](<https://github.com/cplusplus/draft/blob/master/papers/n4140.pdf?raw=true>))

[Artigo Principal: C++14](<#/doc/14>)

Revisão menor do padrão C++

  * 2015: Filesystem library TS (ISO/IEC TS 18822:2015) ([ISO Store](<https://www.iso.org/iso/catalogue_detail.htm?csnumber=63483>)) ([2014 draft](<https://wg21.link/n4100>))

Este TS é uma extensão experimental da biblioteca C++ que especifica uma biblioteca de sistema de arquivos baseada no boost.filesystem V3 (com algumas modificações e extensões). Este TS foi mesclado ao C++17.

  * 2015: Extensions for Parallelism TS (ISO/IEC TS 19570:2015) ([ISO Store](<https://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=65241>)) ([2015 draft](<https://wg21.link/n4507>))

Este TS padroniza a API paralela e vetor-paralela para todos os algoritmos da biblioteca padrão, além de adicionar novos algoritmos como `reduce`, `transform_reduce` ou `exclusive_scan`. Este TS foi mesclado ao C++17.

  * 2015: Extensions for Transactional Memory TS (ISO/IEC TS 19841:2015) ([ISO Store](<https://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=66343>)) ([[2015 draft](<https://wg21.link/n4514>))

Este TS estende a linguagem C++ core com blocos sincronizados e atômicos, bem como funções seguras para transações, que implementam semânticas de memória transacional.

  * 2015: Extensions for Library Fundamentals TS (ISO/IEC TS 19568:2015) ([ISO Store](<https://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=65238>)) ([2015 draft](<https://wg21.link/n4480>))

Este TS adiciona vários novos componentes à biblioteca padrão C++: [`optional`](<#/doc/experimental/optional>), [`any`](<#/doc/experimental/any>), [`string_view`](<#/doc/experimental/basic_string_view>), [`sample`](<#/doc/experimental/sample>), [`search`](<#/doc/experimental/search>), [`apply`](<#/doc/experimental/apply>), [alocadores polimórficos](<#/doc/experimental/memory>) e [templates de variável](<#/doc/experimental/memory>) para type traits. Este TS foi mesclado ao C++17.

  * 2015: Extensions for Concepts TS (ISO/IEC TS 19217:2015) ([ISO Store](<https://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=64031>)) ([2015 draft](<https://wg21.link/n4553>))

Este TS estende a linguagem C++ core com concepts (requisitos de tipo nomeados) e constraints (limites nos tipos permitidos em declarações de template, função e variável), o que auxilia a metaprogramação e simplifica os diagnósticos de instanciação de template, veja [concepts](<#/doc/experimental/constraints>). Este TS foi mesclado ao C++20, com algumas omissões.

  * 2016: Extensions for Concurrency TS (ISO/IEC TS 19571:2016) ([ISO Store](<https://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=65242>)) ([2015 draft](<https://wg21.link/p0159r0>))

Este TS estende a biblioteca C++ para incluir [várias extensões](<#/doc/experimental/concurrency>) para [std::future](<#/doc/thread/future>), [latches](<#/doc/thread/latch>) e [barriers](<#/doc/thread/barrier>), e ponteiros inteligentes atômicos.

### Período C++17

  * 2017: **C++17** ([ISO Store](<https://www.iso.org/standard/68564.html>)) ([ANSI Store](<https://webstore.ansi.org/RecordDetail.aspx?sku=INCITS%2fISO%2fIEC+14882%3a2017+\(2018\)>)) ([n4659 2017-03-21 final draft](<https://wg21.link/n4659>))

[Artigo Principal: C++17](<#/doc/17>)

A principal revisão do padrão C++ após o C++11

  * 2017: Extensions for Ranges TS (ISO/IEC TS 21425:2017) ([ISO Store](<https://www.iso.org/standard/70910.html>)) ([2017 draft](<https://wg21.link/n4685>))

Este TS estende a biblioteca C++ para incluir [ranges](<#/doc/experimental/ranges>), uma nova e mais poderosa abstração para substituir pares de iteradores, juntamente com range views, sentinel ranges, projeções para transformações em tempo real, novos adaptadores de iteradores e algoritmos. Esta extensão finalmente torna possível ordenar um vetor com sort(v);

  * 2017: Extensions for Coroutines TS (ISO/IEC TS 22277:2017) ([ISO Store](<https://www.iso.org/standard/73008.html>)) ([2017 draft](<https://wg21.link/n4680>))

Este TS estende a linguagem C++ core e a biblioteca padrão para incluir coroutines sem pilha (funções resumíveis). Isso adiciona as palavras-chave [`co_await`](<#/doc/keyword/co_await>), [`co_yield`](<#/doc/keyword/co_yield>) e [`co_return`](<#/doc/keyword/co_return>).

  * 2018: Extensions for Networking TS (ISO/IEC TS 19216:2018) ([ISO Store](<https://www.iso.org/standard/64030.html>)) ([2017 draft](<https://wg21.link/n4734>))

Este TS estende a biblioteca C++ para incluir rede TCP/IP baseada em [boost.asio](<https://www.boost.org/doc/libs/1_67_0/doc/html/boost_asio.html>).

  * 2018: Extensions for modules TS (ISO/IEC TS 21544:2018) ([ISO Store](<https://www.iso.org/standard/71051.html>)) ([2018 draft](<https://wg21.link/n4720>))

Este TS estende a linguagem C++ core para incluir módulos. Isso adiciona os identificadores especiais [`module`](<#/doc/identifier_with_special_meaning/module>), [`import`](<#/doc/identifier_with_special_meaning/import>) e reintroduz a palavra-chave [`export`](<#/doc/keyword/export>) com um novo significado.

  * 2018: Extensions for Parallelism version 2 TS (ISO/IEC TS 19570:2018) ([ISO Store](<https://www.iso.org/standard/70588.html>)) ([2018 draft](<https://wg21.link/n4773>))

Este TS estende a biblioteca C++ para incluir duas novas políticas de execução (unseq e vec), algoritmos paralelos adicionais como reduction_plus ou for_loop_strided, blocos de tarefas para bifurcar e unir tarefas paralelas, tipos SIMD e operações nesses tipos.

### Período C++20

  * 2020: **C++20** ([ISO Store](<https://www.iso.org/standard/79358.html>)) (final draft [n4860 2020-03-31](<https://wg21.link/n4860>))

[Artigo Principal: C++20](<#/doc/20>)

A principal revisão do padrão C++ após o C++17

  * 2021: Reflection TS (ISO/IEC TS 23619:2021) ([ISO store](<https://www.iso.org/standard/76425.html>)) ([2020 draft](<https://wg21.link/n4856>))

Este TS estende o C++ com facilidades para inspecionar entidades de programa como variáveis, enumerações, classes e seus membros, lambdas e suas capturas, etc.

### Desenvolvimento futuro

  * [Especificações técnicas experimentais](<#/doc/experimental>)
  * 2026: **C++** latest draft [n5001 (2024-12-17)](<https://wg21.link/n5001>)

[Artigo Principal: C++23](<#/doc/23>)

A próxima grande revisão do padrão C++

### Veja também

[Documentação C](<#/>) para o Histórico do C
---
  
### Links externos

1.  | [Um Histórico do C++: 1979-1991](<https://www.stroustrup.com/hopl2.pdf>)
---|---
2.  | [Evoluindo uma linguagem no e para o mundo real: C++ 1991-2006](<https://www.stroustrup.com/hopl-almost-final.pdf>)
3.  | [Prosperando em um mundo lotado e em mudança: C++ 2006-2020](<https://www.stroustrup.com/hopl20main-p5-p-bfc9cd4--final.pdf>)
4.  | [Fundação C++ Padrão](<https://isocpp.org>)
5.  | [C++ na Wikipédia](<https://en.wikipedia.org/wiki/C%2B%2B#History> "enwiki:C++")
6.  | [Comitê de Padrões C++](<https://www.open-std.org/jtc1/sc22/wg21/>)