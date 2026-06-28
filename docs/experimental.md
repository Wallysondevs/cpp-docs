# Funcionalidades Experimentais do C++

O comitê de padronização do C++ publica extensões experimentais da linguagem e da biblioteca C++ para futura padronização.

Nota: até 2012, essas publicações usavam o formato **TR** (relatório técnico). Desde 2012, o procedimento da ISO mudou para usar o formato **TS** (especificação técnica).

#### Especificações TR/TS

Número ISO | Nome | Status | Links, headers
---|---|---|---
ISO/IEC TR 18015:2006 | Relatório Técnico sobre Desempenho do C++ | Publicado em 2006 ([ISO store](<https://www.iso.org/standard/43351.html>)). Rascunho: [TR18015](<https://www.open-std.org/jtc1/sc22/wg21/docs/TR18015.pdf>) (2006-02-15). |
ISO/IEC TR 19768:2007 | Relatório Técnico sobre Extensões da Biblioteca C++ | Publicado em 15-11-2007 ([ISO store](<https://www.iso.org/standard/43289.html>)). Rascunho: [N1836](<https://wg21.link/n1836>) (2005-06-24) ISO 29124 foi separada, o restante foi incorporado ao C++11. |
ISO/IEC 29124:2010 | Extensões para a Biblioteca C++ para suportar funções matemáticas especiais | Publicado em 03-09-2010 ([ISO Store](<https://www.iso.org/standard/50511.html>)). Rascunho final: [N3060](<https://wg21.link/n3060>) (2010-03-06). **✔**[Incorporado ao C++17](<#/doc/numeric/special_functions>). | [Special functions](<#/doc/experimental/special_math>) (experimental), [Special functions](<#/doc/numeric/special_functions>)
ISO/IEC TR 24733:2011 | Extensões para a linguagem de programação C++ para suportar aritmética de ponto flutuante decimal | Publicado em 25-10-2011 ([ISO Store](<https://www.iso.org/standard/38843.html>)) Rascunho: [N2849](<https://wg21.link/n2849>) (2009-03-06). Pode ser substituído por uma futura TS ou incorporado a uma futura revisão do C++ (a proposta de incorporação mais recente foi [N3871](<https://wg21.link/n3871>)). |
ISO/IEC TS 18822:2015 | Especificação Técnica de Sistema de Arquivos C++ | Publicado em 18-06-2015 ([ISO store](<https://www.iso.org/standard/63483.html>)). Rascunho final: [N4100](<https://wg21.link/n4100>) (2014-07-04). **✔**[Incorporado ao C++17](<#/doc/filesystem>). | [Filesystem](<#/doc/experimental/fs>) (experimental), [Filesystem](<#/doc/filesystem>), [`<filesystem>`](<#/doc/header/filesystem>)
ISO/IEC TS 19570:2015 | Extensões C++ para Paralelismo | Publicado em 24-06-2015. ([ISO Store](<https://www.iso.org/standard/65241.html>)). Rascunho final: [N4507](<https://wg21.link/n4507>) (2015-05-05). **✔** Incorporado ao C++17. | [Parallelism](<#/doc/experimental/parallelism>)
ISO/IEC TS 19841:2015 | TS de Memória Transacional | Publicado em 16-09-2015, ([ISO Store](<https://www.iso.org/standard/66343.html>)). Rascunho final: [N4514](<https://wg21.link/n4514>) (2015-05-08). | [Transactional memory](<#/doc/language/transactional_memory>)
ISO/IEC TS 19568:2015 | Extensões C++ para Fundamentos da Biblioteca | Publicado em 30-09-2015, ([ISO Store](<https://www.iso.org/standard/65238.html>)). Rascunho final: [N4480](<https://wg21.link/n4480>) (2015-04-07). **✔** Incorporado ao C++17, exceto pelos invocation traits. | [Library extensions](<#/doc/experimental/memory>)
ISO/IEC TS 19217:2015 | Extensões C++ para Concepts | Publicado em 13-11-2015 ([ISO Store](<https://www.iso.org/standard/64031.html>)). Rascunho final: [N4553](<https://wg21.link/n4553>) (2015-10-02). Rascunho atual: [P0734R0](<https://wg21.link/p0734r0>) (2017-07-14). **✔**[Incorporado ao C++20](<#/doc/language/constraints>) (com modificações). | [Constraints and concepts](<#/doc/experimental/constraints>) (experimental), [Concepts](<#/doc/concepts>), [`<concepts>`](<#/doc/header/concepts>)
ISO/IEC TS 19571:2016 | Extensões C++ para Concorrência | Publicado em 19-01-2016 ([ISO Store](<https://www.iso.org/standard/65242.html>)). Rascunho final: [P0159R0](<https://wg21.link/p0159r0>) (2015-10-22). **✔** Parcialmente incorporado ao C++20. | [Concurrency](<#/doc/experimental/concurrency>)
ISO/IEC TS 19568:2017 | Extensões C++ para Fundamentos da Biblioteca, Versão 2 | Publicado em 30-03-2017 ([ISO Store](<https://www.iso.org/standard/70587.html>)). Rascunho: [N4617](<https://wg21.link/n4617>) (2016-11-28). **✔** Parcialmente incorporado ao C++17 e C++20. | [Library extensions 2](<#/doc/experimental/lib_extensions_2>)
ISO/IEC TS 21425:2017 | TS de Ranges | Publicado em 05-12-2017 ([ISO Store](<https://www.iso.org/standard/70910.html>)). Rascunho: [N4685](<https://wg21.link/n4685>) (2017-07-31). **✔**[Incorporado ao C++20](<#/doc/ranges>). | [Ranges](<#/doc/experimental/ranges>) (experimental), [Ranges](<#/doc/ranges>), [`<ranges>`](<#/doc/header/ranges>)
ISO/IEC TS 22277:2017 | TS de Coroutines | Publicado em 05-12-2017 ([ISO Store](<https://www.iso.org/standard/73008.html>)). Rascunho: [N4736](<https://wg21.link/n4736>) (2018-03-31). Rascunho mais recente: [N4775](<https://wg21.link/n4775>) (2018-10-07). **✔**[Incorporado ao C++20](<#/doc/coroutine>). | [`<coroutine>`](<#/doc/header/coroutine>)
ISO/IEC TS 19216:2018 | TS de Networking | Publicado em 24-04-2018 ([ISO Store](<https://www.iso.org/standard/64030.html>)). Rascunho: [N4734](<https://wg21.link/n4734>) (2017-04-04). Rascunho mais recente: [N4771](<https://wg21.link/n4771>) (2018-10-08). | Veja também propostas não-TS
---
  * Networking Seguro Padrão - [P2586R0](<https://wg21.link/P2586R0>) (2022-09-13)
  * Interface Sender-Receiver para Networking - [P2762R2](<https://wg21.link/P2762R2>) (2023-10-12)
  * Uma direção proposta para Networking Padrão C++ baseada em [IETF TAPS](<https://datatracker.ietf.org/doc/draft-ietf-taps-arch/>) - [P3185R0](<https://wg21.link/P3185R0>) (2024-12-14)
  * API proposta para criar conexões de networking baseadas em TAPS - [P3482R0](<https://wg21.link/P3482R0>) (2024-12-14)

[Networking](<#/doc/experimental/networking>)
ISO/IEC TS 21544:2018 | TS de Modules | Publicado em 16-05-2018 ([ISO Store](<https://www.iso.org/standard/71051.html>)). Rascunho Final: [N4720](<https://wg21.link/n4720>) (2018-01-29). **✔**[Incorporado ao C++20](<#/doc/language/modules>). |
---|---|---|---
ISO/IEC TS 19570:2018 | TS de Paralelismo Versão 2 | Publicado em 15-11-2018 ([ISO Store](<https://www.iso.org/standard/70588.html>)). Rascunho final: [N4793](<https://wg21.link/n4793>) (2018-11-26). Rascunho pós-publicação: [N4808](<https://wg21.link/n4808>) (2019-03-11). Veja também propostas não-TS de `std::simd` [abaixo](<#/doc/experimental>). | [Parallelism 2](<#/doc/experimental/parallelism_2>)
ISO/IEC TS 23619:2021 | TS de Reflection | Publicado em 11-10-2021 ([ISO store](<https://www.iso.org/standard/76425.html>)). Rascunho: [N4856](<https://wg21.link/n4856>) (2020-03-02). Veja também propostas não-TS [abaixo](<#/doc/experimental>). | [Reflection](<#/doc/experimental/reflect>)
| Numéricos | Desenvolvimento inicial. Rascunho: [P1889R1](<https://wg21.link/p1889r1>) (2019-12-27). |
ISO/IEC TS 9922 | TS de Concorrência Versão 2 | Publicado em 09-10-2024 ([ISO Store](<https://www.iso.org/standard/83630.html>)). Rascunho: [N4956](<https://wg21.link/n4956>) (2023-07-05). | [Concurrency 2](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/concurrency_2&action=edit&redlink=1> "cpp/experimental/concurrency 2 \(page does not exist\)")
ISO/IEC TS 19568:2024 | Extensões C++ para Fundamentos da Biblioteca, Versão 3 | Publicado em 26-08-2024 ([ISO Store](<https://www.iso.org/standard/86293.html>)). Rascunho: [N4948](<https://wg21.link/n4948>) (2023-05-08). | [Library extensions 3](<#/doc/experimental/lib_extensions_3>)
ISO/IEC DTS 12907 | TS de Memória Transacional, Versão 2 | Desenvolvimento inicial. Rascunho: [N4923](<https://wg21.link/n4923>) (2022-10-14). |
ISO/IEC NP 19569 | TS de Extensões de Array | **×** Retirado. Rascunho abandonado: [N3820](<https://wg21.link/n3820>) (2013-10-10). |

#### Propostas não-TS

Nome | Status | Links, Headers
---|---|---
Álgebra Linear | **✔**[Incorporado ao C++26](<#/doc/header/linalg>). Proposta: [P1673R13](<https://wg21.link/P1673R13>) (2023-11-10). | Mais propostas:
---
  * Uma proposta para adicionar suporte a álgebra linear à standard library do C++ - [P1385R7](<https://wg21.link/P1385R7>) (2022-10-15)
  * Evoluindo uma Biblioteca de Álgebra Linear C++ Padrão a partir do [BLAS](<https://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms> "enwiki:Basic Linear Algebra Subprograms") - [P1674R2](<https://wg21.link/P1674R2>) (2022-05-15)
  * Apresentação de [P1385R7](<https://wg21.link/P1385R7>) ao LEWG em Issaquah 2023 - [P2802R0](<https://wg21.link/P2802R0>) (2023-02-09)
  * Corrigir C++26 otimizando [linalg::conjugated](<http://en.cppreference.com/w/cpp/numeric/linalg/conjugated>) para tipos de valor não-complexos - [P3050R3](<https://wg21.link/P3050R3>) (2024-10-29)
  * Corrigir C++26 tornando as atualizações de rank-k e rank-2k [simétricas](<https://en.wikipedia.org/wiki/Symmetric_matrix> "enwiki:Symmetric matrix") e [Hermitianas](<https://en.wikipedia.org/wiki/Hermitian_matrix> "enwiki:Hermitian matrix") consistentes com o [BLAS](<https://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms> "enwiki:Basic Linear Algebra Subprograms") - [P3371R3](<https://wg21.link/P3371R3>) (2024-10-29)

[`<linalg>`](<#/doc/header/linalg>)
std::execution | **✔**[Incorporado ao C++26](<#/doc/header/execution>). Proposta: [P2300R10](<https://wg21.link/P2300R10>) (2024-06-28). | Mais propostas:
---
  * Contexto de execução do sistema - [P2079R6](<https://wg21.link/P2079R6>) (2025-01-13)
  * Interface Sender-Receiver para Networking - [P2762R2](<https://wg21.link/P2762R2>) (2023-10-12)
  * Pontos de customização de membros para Senders e Receivers - [P2855R1](<https://wg21.link/P2855R1>) (2024-02-22)
  * Um Modelo de Eventos para Executors C++ - [P2882R0](<https://wg21.link/P2882R0>) (2023-05-11)
  * Customização de Algoritmo Sender - [P2999R3](<https://wg21.link/P2999R3>) (2023-12-13)
  * Introdução a std::execution - [P3090R0](<https://wg21.link/P3090R0>) (2024-02-14)
  * Um plano para std::execution para C++26 - [P3109R0](<https://wg21.link/P3109R0>) (2024-02-12)
  * Melhorando diagnósticos para expressões Sender - [P3164R3](<https://wg21.link/P3164R3>) (2025-01-10)
  * Reconsiderando o algoritmo std::execution::on - [P3175R3](<https://wg21.link/P3175R3>) (2024-06-25)
  * Uma consulta de sender para comportamento de conclusão - [P3206R0](<https://wg21.link/P3206R0>) (2025-01-13)
  * Adaptadores Sender `finally`, `write_env` e `unstoppable` - [P3284R2](<https://wg21.link/P3284R2>) (2024-11-21)
  * Corrigindo a Customização Preguiçosa de Algoritmo Sender - [P3303R1](<https://wg21.link/P3303R1>) (2024-06-25)
  * Uma Utilitário para Criar Ambientes de Execução - [P3325R5](<https://wg21.link/P3325R5>) (2024-11-22)
  * Quando Você Sabe que `connect` Não Lança Exceções? - [P3388R1](<https://wg21.link/P3388R1>) (2025-01-11)
  * Correções de redação para std::execution - [P3396R1](<https://wg21.link/P3396R1>) (2024-11-19)
  * Habilitando cancelamento de senders baseado em stop-token mais eficiente - [P3409R1](<https://wg21.link/P3409R1>) (2024-11-17)
  * `system_scheduler` em Win32, Darwin e Linux - [P3456R0](<https://wg21.link/P3456R0>) (2024-10-15)
  * Resumindo problemas de std::execution::bulk() - [P3481R1](<https://wg21.link/P3481R1>) (2025-01-13)
  * Diagnósticos de Sender de Alta Qualidade com Exceções Constexpr - [P3557R0](<https://wg21.link/P3557R0>) (2025-01-13)

[Execution](<#/doc/experimental/execution>) (experimental),
[Execution](<#/doc/experimental/execution>),
[`<execution>`](<#/doc/header/execution>)
[std::inplace_vector](<#/doc/container/inplace_vector>) | **✔**[Incorporado ao C++26](<#/doc/header/inplace_vector>). Proposta: [P0843R14](<https://wg21.link/P0843R14>) (2024-06-26). | Mais propostas:
---
  * `inplace_vector` - [P0843](<https://wg21.link/P0843>)([R7](<https://wg21.link/P0843R7>)) apresentação LEWG - [P2925R0](<https://wg21.link/P2925R0>) (2023-06-16)
  * Uma direção para Vector - [P3147R1](<https://wg21.link/P3147R1>) (2024-03-18)
  * Um std::inplace_vector ciente de alocador - [P3160R2](<https://wg21.link/P3160R2>) (2024-10-15)

[`<inplace_vector>`](<#/doc/header/inplace_vector>)
[`experimental::simd`](<#/doc/experimental/simd>)
std::simd | **✔**[Incorporado ao C++26](<#/doc/header/simd>). Proposta: [P1928R15](<https://wg21.link/P1928R15>) (2024-11-22). O documento principal (TS ISO/IEC 19570:2018) é descrito em ["Extensões C++ para Paralelismo V2"](<#/doc/experimental>) acima. | Mais propostas:
---
  * Feedback Esperado de SIMD em Paralelismo TS2 - [P1915R0](<https://wg21.link/P1915R0>) (2019-10-07)
  * Resposta da Intel a [`std::simd`](<#/doc/experimental/simd>) - [P2638R0](<https://wg21.link/P2638R0>) (2022-09-22)
  * Proposta para suportar valores complexos intercalados em [`std::simd`](<#/doc/experimental/simd>) - [P2663R6](<https://wg21.link/P2663R6>) (2025-01-13)
  * Proposta para estender [`std::simd`](<#/doc/experimental/simd>) com API de permutação - [P2664R9](<https://wg21.link/P2664R9>) (2025-01-13)
  * Slides de Introdução a `std::simd` - [P2803R0](<https://wg21.link/P2803R0>) (2023-02-09)
  * Slides de Issaquah para a resposta da Intel a [`std::simd`](<#/doc/experimental/simd>) - [P2807R0](<https://wg21.link/P2807R0>) (2023-02-10)
  * Proposta para estender [`std::simd`](<#/doc/experimental/simd>) com mais construtores e acessores - [P2876R1](<https://wg21.link/P2876R1>) (2024-05-22)
  * API RNG baseada em [`std::simd`](<#/doc/experimental/simd>) vs. tipo algoritmo - [P2880R0](<https://wg21.link/P2880R0>) (2023-05-18)
  * Tipos `std::simd` devem ser regulares - [P2892R0](<https://wg21.link/P2892R0>) (2023-05-19)
  * Tipos `std::simd` devem ser regulares - [P2892R0](<https://wg21.link/P2892R0>) apresentação LEWG - [P2926R0](<https://wg21.link/P2926R0>) (2023-06-19)
  * `simd_invoke` - [P2929R0](<https://wg21.link/P2929R0>) (2023-07-19)
  * Sobrecargas de `std::simd` para [`<bit>`](<#/doc/header/bit>) - [P2933R3](<https://wg21.link/P2933R3>) (2025-01-13)
  * Adicionar suporte de biblioteca saturante a [`std::simd`](<#/doc/experimental/simd>) - [P2956R0](<https://wg21.link/P2956R0>) (2023-08-01)
  * Permitindo tipos definidos pelo usuário em [`std::simd`](<#/doc/experimental/simd>) - [P2964R1](<https://wg21.link/P2964R1>) (2024-05-22)
  * Direções de Interface para [`std::simd`](<#/doc/experimental/simd>) - [P3024R0](<https://wg21.link/P3024R0>) (2023-11-30)
  * Fornecer funções geradoras de permutação [`std::simd`](<#/doc/experimental/simd>) predefinidas para operações comuns - [P3067R0](<https://wg21.link/P3067R0>) (2024-05-22)
  * Substituir o operator[] de [`std::simd`](<#/doc/experimental/simd>) por funções getter e setter - ou não - [P3275R0](<https://wg21.link/P3275R0>) (2024-05-22)
  * Exploração de namespaces para [`std::simd`](<#/doc/experimental/simd>) - [P3287R2](<https://wg21.link/P3287R2>) (2024-11-13)
  * Construtores de Range para [`std::simd`](<#/doc/experimental/simd>) - [P3299R3](<https://wg21.link/P3299R3>) (2024-12-17)
  * Adicionar um objeto `iota` para [`std::simd`](<#/doc/experimental/simd>) (e mais) - [P3319R2](<https://wg21.link/P3319R2>) (2024-11-19)
  * Problemas de `std::simd`: explicit, unsequenced, posição do elemento de identidade e membros de simd desabilitado - [P3430R2](<https://wg21.link/P3430R2>) (2025-01-13)
  * Adicionar construtor nomeado `n_elements` a [`std::simd`](<#/doc/experimental/simd>) - [P3440R0](<https://wg21.link/P3440R0>) (2024-10-15)
  * Renomear `simd_split` para `simd_chunk` - [P3441R0](<https://wg21.link/P3441R0>) (2024-10-15)
  * Adicionar utilitários para facilitar o type-bit casting em [`std::simd`](<#/doc/experimental/simd>) - [P3445R0](<https://wg21.link/P3445R0>) (2024-10-16)
  * `std::simd` é um [`range`](<#/doc/ranges/range>) - [P3480R3](<https://wg21.link/P3480R3>) (2025-01-13)

[Data parallel types](<#/doc/experimental/simd>) (experimental),
[Data parallel types](<#/doc/numeric/simd>),
[`<simd>`](<#/doc/header/simd>)
Pattern Matching | Desenvolvimento inicial. Rascunho [P1371R3](<https://wg21.link/P1371R3>) (2020-09-15). | Mais propostas:
---
  * Pattern Matching usando is e as - [P2392R3](<https://wg21.link/P2392R3>) (2024-10-16)
  * Pattern Matching: expressão match - [P2688R5](<https://wg21.link/P2688R5>) (2025-01-13)
  * switch para Pattern Matching - [P2940R0](<https://wg21.link/P2940R0>) (2022-04-18)
  * Identificadores para Pattern Matching - [P2941R0](<https://wg21.link/P2941R0>) (2022-02-24)
  * Uma Pós-condição _é_ um Pattern Match - [P3210R2](<https://wg21.link/P3210R2>) (2024-09-10)
  * Uma sintaxe unificada para Pattern Matching e Contracts ao introduzir um novo nome - [P3249R0](<https://wg21.link/P3249R0>) (2024-05-22)
  * Uma notação mais simples para PM - [P3332R0](<https://wg21.link/P3332R0>) (2024-06-18)
  * Slides para P2688R2 - Pattern Matching: Expressão match - [P3476R0](<https://wg21.link/P3476R0>) (2024-10-16)
  * Pattern Matching: Ponto de Customização para Tipos de Soma Abertos - [P3521R0](<https://wg21.link/P3521R0>) (2024-12-17)
  * Pattern Matching: *similar a variant* e 'std::expected' - [P3527R1](<https://wg21.link/P3527R1>) (2025-01-13)
  * Pattern matching - [P3572R0](<https://wg21.link/P3572R0>) (2025-01-12)

Reflection | O documento principal (ISO/IEC TS 23619:2021) é descrito em [TS de Reflection](<#/doc/experimental>) acima. | Mais propostas:
---
  * Reflection Escalável em C++ - [P1240R2](<https://wg21.link/P1240R2>) (2022-01-14)
  * Declarações de expansão - [P1306R3](<https://wg21.link/P1306R3>) (2024-10-14)
  * Reflection em atributos - [P1887R1](<https://wg21.link/P1887R1>) (2020-01-13)
  * Metaprogramming - [P2237R0](<https://wg21.link/P2237R0>) (2020-10-15)
  * Bindings Python com Reflection Baseada em Valor - [P2911R1](<https://wg21.link/P2911R1>) (2023-10-13)
  * Reflection para C++26 - [P2996R9](<https://wg21.link/P2996R9>) (2025-01-13)
  * Usando Reflection para Substituir uma Metalinguagem para Geração de Bindings JS - [P3010R0](<https://wg21.link/P3010R0>) (2023-10-13)
  * Comparação de ABI com reflection - [P3095R0](<https://wg21.link/P3095R0>) (2024-02-15)
  * Reflection de Parâmetros de Função em Reflection para C++26 - [P3096R5](<https://wg21.link/P3096R5>) (2024-12-14)
  * Extensões Generativas para Reflection - [P3157R1](<https://wg21.link/P3157R1>) (2024-05-22)
  * Sintaxe para Reflection - [P3381R0](<https://wg21.link/P3381R0>) (2024-09-17)
  * Reflection de atributos - [P3385R3](<https://wg21.link/P3385R3>) (2025-01-07)
  * Anotações para Reflection - [P3394R1](<https://wg21.link/P3394R1>) (2025-01-13)
  * Resumo das Opções de Sintaxe de Reflection - [P3419R0](<https://wg21.link/P3419R0>) (2024-10-11)
  * Reflection de Templates - [P3420R1](<https://wg21.link/P3420R1>) (2025-01-13)
  * O header de Reflection deve minimizar as dependências da standard library - [P3429R1](<https://wg21.link/P3429R1>) (2024-11-29)
  * Reflection e meta-programação - [P3435R0](<https://wg21.link/P3435R0>) (2024-10-14)
  * Princípios padrão propostos: Refletir C++, Gerar C++ - [P3437R1](<https://wg21.link/P3437R1>) (2024-11-07)
  * Reflection no Processo SG21 2024 - [P3443R0](<https://wg21.link/P3443R0>) (2024-10-14)
  * Uma Sugestão para Controle de Acesso de Reflection - [P3451R0](<https://wg21.link/P3451R0>) (2024-10-15)
  * Reflexões sobre reflection e acesso - [P3493R0](<https://wg21.link/P3493R0>) (2024-11-10)
  * Modelando Controle de Acesso com Reflection - [P3547R0](<https://wg21.link/P3547R0>) (2025-01-09)
  * Tratamento de Erros em Reflection - [P3560R0](<https://wg21.link/P3560R0>) (2025-01-12)
  * Separar define_aggregate de Reflection - [P3569R0](<https://wg21.link/P3569R0>) (2025-01-11)
  * Reconsiderar o acesso de reflection para C++26 - [P3587R0](<https://wg21.link/P3587R0>) (2025-01-13)

[Reflection](<#/doc/experimental/reflect>) (experimental)
Contracts | Desenvolvimento inicial. Proposta [P2659R2](<https://wg21.link/P2659R2>) (2022-11-30). Rascunho [P2660R0](<https://wg21.link/P2660R0>) (2022-10-14). | Mais propostas:
---
  * Uma Proposta para Publicar uma Especificação Técnica para Contracts - [P2659R2](<https://wg21.link/P2659R2>) (2022-12-05)
  * Emendas diversas à TS de Contracts - [P2661R0](<https://wg21.link/P2661R0>) (2022-10-15)
  * Contracts para C++: Priorizando a Segurança - [P2680R1](<https://wg21.link/P2680R1>) (2022-12-15)
  * Um plano proposto para contracts em C++ - [P2695R1](<https://wg21.link/P2695R1>) (2023-02-09)
  * Proposta de Sintaxe de Contracts Centrada em Condições - [P2737R0](<https://wg21.link/P2737R0>) (2022-12-30)
  * Contracts para C++: Priorizando a Segurança - Slides de apresentação - [P2743R0](<https://wg21.link/P2743R0>) (2022-12-13)
  * Avaliação de Contracts Verificados - [P2751R1](<https://wg21.link/P2751R1>) (2023-02-14)
  * Um Plano Ousado para uma Facilidade Completa de Contracts - [P2755R1](<https://wg21.link/P2755R1>) (2024-04-11)
  * A ideia por trás do MVP de contracts - [P2817R0](<https://wg21.link/P2817R0>) (2023-03-05)
  * Proposta de Contracts Suportando o Estilo Const-On-Definition - [P2829R0](<https://wg21.link/P2829R0>) (2023-04-13)
  * Semântica de tratamento de violação de contract para o MVP de contracts - [P2852R0](<https://wg21.link/P2852R0>) (2023-04-24)
  * A Regra de Lakos: Contracts Estreitos e noexcept São Inerentemente Incompatíveis - [P2861R0](<https://wg21.link/P2861R0>) (2023-05-19)
  * Requisitos para uma sintaxe de Contracts - [P2885R3](<https://wg21.link/P2885R3>) (2023-10-05)
  * Contracts em lambdas - [P2890R2](<https://wg21.link/P2890R2>) (2023-12-13)
  * Avaliação constante de Contracts - [P2894R2](<https://wg21.link/P2894R2>) (2024-01-11)
  * Questões de design pendentes para o MVP de Contracts - [P2896R0](<https://wg21.link/P2896R0>) (2023-08-22)
  * Contracts para C++ - Justificativa - [P2899R0](<https://wg21.link/P2899R0>) (2025-01-13)
  * Contracts para C++ - [P2900R13](<https://wg21.link/P2900R13>) (2025-01-13)
  * Uma Abordagem Baseada em Princípios para Questões de Design Abertas para Contracts - [P2932R3](<https://wg21.link/P2932R3>) (2024-01-16)
  * Uma Sintaxe Semelhante a Atributos para Contracts - [P2935R4](<https://wg21.link/P2935R4>) (2023-11-05)
  * Contracts devem evitar divulgar informações sensíveis - [P2947R0](<https://wg21.link/P2947R0>) (2023-07-20)
  * Slides para [P2861R0](<https://wg21.link/P2861R0>): Contracts Estreitos e noexcept são Inerentemente Incompatíveis - [P2949R0](<https://wg21.link/P2949R0>) (2023-07-14)
  * Contracts e funções virtuais para o MVP de Contracts - [P2954R0](<https://wg21.link/P2954R0>) (2023-08-03)
  * Contracts e coroutines - [P2957R2](<https://wg21.link/P2957R2>) (2024-10-14)
  * Uma sintaxe natural para Contracts - [P2961R2](<https://wg21.link/P2961R2>) (2023-11-08)
  * Uma Visão Geral das Escolhas de Sintaxe para Contracts - [P3028R0](<https://wg21.link/P3028R0>) (2023-11-05)
  * Proteção contra modificações em contracts - [P3071R1](<https://wg21.link/P3071R1>) (2023-12-17)
  * Remover `evaluation_undefined_behavior` e `will_continue` do MVP de Contracts - [P3073R0](<https://wg21.link/P3073R0>) (2024-01-27)
  * Deveriam `ignore` e `observe` existir para avaliação constante de contracts? - [P3079R0](<https://wg21.link/P3079R0>) (2024-01-11)
  * Contracts para C++: Suporte para funções virtuais - [P3097R0](<https://wg21.link/P3097R0>) (2024-04-15)
  * Contracts para C++: Capturas de pós-condição - [P3098R1](<https://wg21.link/P3098R1>) (2024-12-11)
  * Comportamento indefinido e errôneo são violações de contract - [P3100R1](<https://wg21.link/P3100R1>) (2024-10-16)
  * Correções Técnicas de Tóquio para Contracts - [P3119R1](<https://wg21.link/P3119R1>) (2024-05-09)
  * Contracts em funções virtuais para o MVP de Contracts - [P3165R0](<https://wg21.link/P3165R0>) (2024-02-27)
  * Contracts herdados - [P3169R0](<https://wg21.link/P3169R0>) (2024-04-14)
  * Suporte a testes de contract - [P3183R1](<https://wg21.link/P3183R1>) (2024-05-22)
  * Slides para apresentação LEWG de [P2900R6](<https://wg21.link/P2900R6>): Contracts para C++ - [P3189R0](<https://wg21.link/P3189R0>) (2024-03-19)
  * Slides para apresentação LEWG de [P2900R7](<https://wg21.link/P2900R7>): Contracts para C++ - [P3190R0](<https://wg21.link/P3190R0>) (2024-03-20)
  * Uma resposta às pesquisas do EWG de Tóquio sobre o MVP de Contracts ([P2900R6](<https://wg21.link/P2900R6>)) - [P3197R0](<https://wg21.link/P3197R0>) (2024-04-12)
  * Uma conclusão da reunião LEWG de Tóquio sobre o MVP de Contracts - [P3198R0](<https://wg21.link/P3198R0>) (2024-03-29)
  * Por que Contracts? - [P3204R0](<https://wg21.link/P3204R0>) (2024-11-07)
  * O contract de [sort()](<#/doc/algorithm/sort>) - [P3212R0](<https://wg21.link/P3212R0>) (2024-07-03)
  * Contracts para C++: Nomeando a _semântica Louis_ - [P3226R0](<https://wg21.link/P3226R0>) (2024-04-12)
  * Contracts para C++: Corrigindo a API de tratamento de violação de contract - [P3227R1](<https://wg21.link/P3227R1>) (2024-10-24)
  * Contracts para C++: Revisitando a elisão e duplicação de verificação de contract - [P3228R1](<https://wg21.link/P3228R1>) (2024-05-21)
  * Tornando o comportamento errôneo compatível com Contracts - [P3229R0](<https://wg21.link/P3229R0>) (2025-01-13)
  * Uma proposta alternativa para nomear a semântica de contract - [P3238R0](<https://wg21.link/P3238R0>) (2024-05-06)
  * Uma sintaxe unificada para Pattern Matching e Contracts ao introduzir um novo nome - [P3249R0](<https://wg21.link/P3249R0>) (2024-05-22)
  * Contracts C++ em relação a ponteiros de função - [P3250R0](<https://wg21.link/P3250R0>) (2024-05-07)
  * Contracts C++ e coroutines - [P3251R0](<https://wg21.link/P3251R0>) (2024-05-07)
  * Tornar o predicado de `contract_assert` mais regular - [P3257R0](<https://wg21.link/P3257R0>) (2024-04-26)
  * Publicar Contracts em uma TS - [P3265R3](<https://wg21.link/P3265R3>) (2024-05-28)
  * Abordagens para Contracts C++ - [P3267R1](<https://wg21.link/P3267R1>) (2024-05-22)
  * Desafios de Constificação de Contracts C++ em Relação ao Código Atual - [P3268R0](<https://wg21.link/P3268R0>) (2024-05-07)
  * Não Publicar Contracts como uma TS - [P3269R0](<https://wg21.link/P3269R0>) (2024-05-21)
  * Repetição, Elisão e Constificação em relação a `contract_assert` - [P3270R0](<https://wg21.link/P3270R0>) (2024-05-22)
  * Tipos de Uso de Função (Contracts para Ponteiros de Função) - [P3271R1](<https://wg21.link/P3271R1>) (2024-10-15)
  * [P2900](<https://wg21.link/P2900>) É Superior a uma TS de Contracts - [P3276R0](<https://wg21.link/P3276R0>) (2024-05-18)
  * Contracts: Protegendo o Protetor - [P3285R0](<https://wg21.link/P3285R0>) (2024-05-15)
  * Integrando Asserções Existentes com Contracts - [P3290R2](<https://wg21.link/P3290R2>) (2024-09-06)
  * C++26 Precisa de Verificação de Contract - [P3297R1](<https://wg21.link/P3297R1>) (2024-06-21)
  * Uma abordagem opt-in para integração de facilidades de assert tradicionais em contracts C++ - [P3311R0](<https://wg21.link/P3311R0>) (2024-05-22)
  * Contracts resolvidos em tempo de compilação - [P3317R0](<https://wg21.link/P3317R0>) (2024-05-22)
  * Interação de Contracts com Ferramentas - [P3321R0](<https://wg21.link/P3321R0>) (2024-07-12)
  * Asserções de contract em ponteiros de função - [P3327R0](<https://wg21.link/P3327R0>) (2024-10-16)
  * Pontos de Verificação Observáveis Durante a Avaliação de Contract - [P3328R0](<https://wg21.link/P3328R0>) (2024-06-14)
  * Experiência de Uso para Contracts com BDE - [P3336R0](<https://wg21.link/P3336R0>) (2024-06-23)
  * Contracts - O que estamos fazendo aqui (Apresentação EWG) - [P3343R0](<https://wg21.link/P3343R0>) (2024-06-25)
  * Funções Virtuais em Contracts (EWG - Apresentação para [P3097](<https://wg21.link/P3097>)) - [P3344R0](<https://wg21.link/P3344R0>) (2024-06-28)
  * Invariantes de classe e filosofia de verificação de contract - [P3361R1](<https://wg21.link/P3361R1>) (2024-07-23)
  * Análise estática e “segurança” de Contracts, [P2900](<https://wg21.link/P2900>) vs [P2680](<https://wg21.link/P2680>)/[P3285](<https://wg21.link/P3285>) - [P3362R0](<https://wg21.link/P3362R0>) (2024-08-13)
  * Asserções de contract versus análise estática e “segurança” - [P3376R0](<https://wg21.link/P3376R0>) (2024-10-14)
  * Análise Estática de Contracts com P2900 - [P3386R1](<https://wg21.link/P3386R1>) (2024-11-25)
  * Asserções de contract em coroutines - [P3387R0](<https://wg21.link/P3387R0>) (2024-10-09)
  * Especificando Propriedades de Asserção de Contract com Rótulos - [P3400R0](<https://wg21.link/P3400R0>) (2025-01-09)
  * Melhorando o tratamento de exceções lançadas por predicados de contract - [P3417R0](<https://wg21.link/P3417R0>) (2024-10-16)
  * Relatório de Implementadores de Contracts - [P3460R0](<https://wg21.link/P3460R0>) (2024-10-16)
  * Endurecimento da standard library - [P3471R2](<https://wg21.link/P3471R2>) (2024-12-14)
  * Constificação não deve fazer parte do MVP (**P**roduto **M**ínimo **V**iável) - [P3478R0](<https://wg21.link/P3478R0>) (2024-10-16)
  * Explorando predicados de contract estritos - [P3499R0](<https://wg21.link/P3499R0>) (2025-01-13)
  * Contracts são 'seguros'? - [P3500R0](<https://wg21.link/P3500R0>) (2025-01-13)
  * Slides para [P2900R11](<https://wg21.link/P2900R11>) - Contracts para C++ - [P3502R0](<https://wg21.link/P3502R0>) (2024-11-18)
  * P2900 Ainda Não Está Pronto para C++26 - [P3506R0](<https://wg21.link/P3506R0>) (2025-01-13)
  * Handlers de violação vs noexcept - [P3541R1](<https://wg21.link/P3541R1>) (2025-01-07)
  * Contracts da Linguagem Principal Por Padrão - [P3558R0](<https://wg21.link/P3558R0>) (2025-01-12)
  * Preocupações com Contracts - [P3573R0](<https://wg21.link/P3573R0>) (2025-01-12)
  * Exigir um handler padrão de violação de contract que não lance exceções - [P3577R0](<https://wg21.link/P3577R0>) (2025-01-12)
  * Observou uma violação de contract? Pule as asserções subsequentes! - [P3582R0](<https://wg21.link/P3582R0>) (2025-01-13)
  * Contracts, Tipos & Funções - [P3583R0](<https://wg21.link/P3583R0>) (2025-01-13)

Gráficos 2D | Desenvolvimento inicial. Rascunho [P0267R10](<https://wg21.link/P0267R10>) (2019-10-07). |
---|---|---
Biblioteca de Grafos | Desenvolvimento inicial. | Mais propostas:
---
  * Biblioteca de Grafos: Visão Geral - [P3126R2](<https://wg21.link/P3126R2>) (2024-08-05)
  * Biblioteca de Grafos: Algoritmos - [P3128R2](<https://wg21.link/P3128R2>) (2024-09-12)
  * Biblioteca de Grafos: Interface de Container de Grafos - [P3130R2](<https://wg21.link/P3130R2>) (2024-08-05)
  * Biblioteca de Grafos: Containers de Grafos - [P3131R2](<https://wg21.link/P3131R2>) (2024-08-05)

Estatísticas | Desenvolvimento inicial. | Mais propostas:
---
  * Estatísticas Básicas - [P1708R9](<https://wg21.link/P1708R9>) (2024-10-15)
  * Observações sobre Estatísticas Básicas, [P1708R9](<https://wg21.link/P1708R9>) - [P3495R0](<https://wg21.link/P3495R0>) (2024-11-13)

Perfis | Desenvolvimento inicial. | Mais propostas:
---
  * Perfis de Segurança: Programação Segura de Tipo e Recurso em C++ Padrão ISO - [P2816R0](<https://wg21.link/P2816R0>) (2023-02-16)
  * Sugestões concretas para Perfis iniciais - [P3038R0](<https://wg21.link/P3038R0>) (2023-12-16)
  * Perfis de segurança centrais: Especificação, adaptabilidade e impacto - [P3081R0](<https://wg21.link/P3081R0>) (2024-10-16)
  * Um framework para desenvolvimento de Perfis - [P3274R0](<https://wg21.link/P3274R0>) (2024-05-10)
  * Um Perfil de Segurança Verificando a Inicialização de Classes - [P3402R1](<https://wg21.link/P3402R1>) (2024-10-15)
*   Invalidação de perfil - eliminando ponteiros pendentes - [P3446R0](<https://wg21.link/P3446R0>) (2024-10-14)
*   Sintaxe de perfis - [P3447R0](<https://wg21.link/P3447R0>) (2024-10-14)
*   Resposta aos Perfis de Segurança Core ([P3081R0](<https://wg21.link/P3081R0>)) - [P3543R0](<https://wg21.link/P3543R0>) (2024-12-17)
*   A Plétora de Problemas com Perfis - [P3586R0](<https://wg21.link/P3586R0>) (2025-01-13)
*   Perfis C++: O Framework - [P3589R0](<https://wg21.link/P3589R0>) (2025-01-13)

### Veja também

[C documentation](<#/>) para recursos experimentais de C
---

### Links externos

1.  | [PL22.16/WG21 document list](<https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/sd-1.htm>) - Todos os documentos do comitê C++ (TS/propostas) para 2016-2025.
---|---
2.  | [JTC1/SC22/WG21 Proposals (mailing) for 2025](<https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/>).