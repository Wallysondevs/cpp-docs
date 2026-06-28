# Teste de recursos (desde C++20)

O padrão define um conjunto de [macros de pré-processador](<#/doc/preprocessor/replace>) correspondentes a recursos da linguagem e da biblioteca C++ introduzidos no C++11 ou posterior. Elas são destinadas a ser uma maneira simples e portátil de detectar a presença de tais recursos.

### Atributos

---
`__has_cpp_attribute(` attribute-token `)` | |
  
Verifica o suporte a um [atributo](<#/doc/language/attributes>) nomeado por attribute-token (após expansão de macro).

Para cada atributo padrão, é definido pela implementação se `__has_cpp_attribute` expande para o valor fornecido na tabela abaixo (que é o ano e mês em que o atributo foi adicionado ao rascunho de trabalho) ou ​0​. Ele expandirá para o valor fornecido na tabela se e somente se o atributo padrão fizer com que a implementação se comporte conforme recomendado (emitindo mensagens de diagnóstico, afetando o layout da classe, etc.).

A presença de atributos específicos do fornecedor é determinada por um valor diferente de zero.

`__has_cpp_attribute` pode ser expandido na expressão de [` #if`](<#/doc/preprocessor/conditional>) e [` #elif`](<#/doc/preprocessor/conditional>). É tratado como uma macro definida por [` #ifdef`](<#/doc/preprocessor/conditional>), [` #ifndef`](<#/doc/preprocessor/conditional>), [` #elifdef`](<#/doc/preprocessor/conditional>), [` #elifndef`](<#/doc/preprocessor/conditional>)(desde C++23) e [`defined`](<#/doc/preprocessor/conditional>) mas não pode ser usado em nenhum outro lugar.

```text
Nome do atributo | Atributo | Valor | Padrão | Documento(s)
---|---|---|---|---
`assume` | `[[assume]]` | `202207L` | (C++23) | P1774R8
`carries_dependency` | `[[carries_dependency]]` | `200809L` | (C++11) | N2556
N2643
`deprecated` | `[[deprecated]]` | `201309L` | (C++14) | N3760
`fallthrough` | `[[fallthrough]]` | `201603L` | (C++17) | P0188R1
`indeterminate` | `[[indeterminate]]` | `202403L` | (C++26) | P2795R5
`likely` | `[[likely]]` | `201803L` | (C++20) | P0479R5
`maybe_unused` | `[[maybe_unused]]` | `201603L` | (C++17) | P0212R1
`no_unique_address` | `[[no_unique_address]]` | `201803L` | (C++20) | P0840R2
`nodiscard` | `[[nodiscard]]` | `201603L` | (C++17) | P0189R1
`[[nodiscard]]` com razão | `201907L` | (C++20) | P1301R4
`noreturn` | `[[noreturn]]` | `200809L` | (C++11) | N2761
`unlikely` | `[[unlikely]]` | `201803L` | (C++20) | P0479R5
Número total de atributos: 11
```

### Recursos da linguagem

As macros a seguir podem ser usadas para detectar se um recurso da linguagem é implementado pela implementação atual. Elas são [predefinidas](<#/doc/preprocessor/replace>) em cada unidade de tradução.

Cada macro expande para um literal inteiro correspondente ao ano e mês em que o recurso correspondente foi incluído no rascunho de trabalho. Quando um recurso muda significativamente, a macro será atualizada de acordo.

```text
Nome da macro | Recurso | Valor | Padrão | Documento(s)
---|---|---|---|---
```
```text
`__cpp_aggregate_bases` | Classes agregadas com classes base | `201603L` | (C++17) | P0017R1
`__cpp_aggregate_nsdmi` | Classes agregadas com inicializadores de membro padrão | `201304L` | (C++14) | N3653
`__cpp_aggregate_paren_init` | Inicialização agregada na forma de inicialização direta | `201902L` | (C++20) | P0960R3
`__cpp_alias_templates` | Alias templates | `200704L` | (C++11) | N2258
`__cpp_aligned_new` | Alocação de memória dinâmica para dados super-alinhados | `201606L` | (C++17) | P0035R4
`__cpp_attributes` | Atributos | `200809L` | (C++11) | N2761
`__cpp_auto_cast` | auto(x) and auto{x} | `202110L` | (C++23) | P0849R8
`__cpp_binary_literals` | Literais binários | `201304L` | (C++14) | N3472
`__cpp_capture_star_this` | [Captura de lambda de *this por valor como [=,*this]](<#/doc/language/lambda>) | `201603L` | (C++17) | P0018R3
`__cpp_char8_t` | `char8_t` | `201811L` | (C++20) | P0482R6
Correção de compatibilidade e portabilidade de char8_t (permite inicialização de arrays de (unsigned) char a partir de literais de string UTF-8) | `202207L`  // (C++23)
(DR20) | P2513R4
`__cpp_concepts` | Concepts | `201907L` | (C++20) | P0734R0
P1084R2
P1452R2
Funções membro especiais triviais condicionais | `202002L` | P0848R3
P2493R0
`__cpp_conditional_explicit` | `explicit(bool)` | `201806L` | (C++20) | P0892R2
`__cpp_consteval` | Funções imediatas | `201811L` | (C++20) | P1073R3
Fazendo `consteval` propagar para cima | `202211L`  // (C++23)
(DR20) | P2564R3
`__cpp_constexpr` | `constexpr` | `200704L` | (C++11) | N2235
constexpr relaxado, métodos `constexpr` não-`const` | `201304L` | (C++14) | N3652
Lambda constexpr | `201603L` | (C++17) | P0170R1
Chamadas de função virtual em expressões constantes; blocos `try` em funções constexpr, `dynamic_cast` e `typeid` polimórfico em expressões constantes; inicialização padrão trivial e declaração asm em funções constexpr | `201907L` | (C++20) | P1064R0
P1002R1
P1327R1
P1331R2
P1668R1
Alterando o membro ativo de uma union em avaliação constante | `202002L` | P1330R0
P2493R0
Variáveis não-literais, rótulos e instruções `goto` em funções constexpr | `202110L` | (C++23) | P2242R3
Relaxando algumas restrições em funções e function templates constexpr | `202207L` | P2448R2
Permitindo variáveis static constexpr em funções constexpr | `202211L` | P2647R1
Cast constexpr de void*: em direção à type-erasure constexpr | `202306L` | (C++26) | P2738R1
constexpr placement new | `202406L` | P2747R2
`__cpp_constexpr_dynamic_alloc` | Operações para duração de armazenamento dinâmica em funções constexpr | `201907L` | (C++20) | P0784R7
`__cpp_constexpr_exceptions` | exceções constexpr | `202411L` | (C++26) | P3068R6
`__cpp_constexpr_in_decltype` | Geração de definições de função e variável quando necessário para avaliação constante | `201711L`  // (C++20)
(DR11) | P0859R0
`__cpp_constinit` | `constinit` | `201907L` | (C++20) | P1143R2
`__cpp_decltype` | `decltype` | `200707L` | (C++11) | N2343
`__cpp_decltype_auto` | Dedução de tipo de retorno para funções normais | `201304L` | (C++14) | N3638
`__cpp_deduction_guides` | Dedução de argumento de template para class templates (CTAD) | `201703L` | (C++17) | P0091R3
P0512R0
P0620R0
CTAD para agregados e aliases | `201907L` | (C++20) | P1814R0
P1816R0
`__cpp_delegating_constructors` | Construtores delegados | `200604L` | (C++11) | N1986
`__cpp_deleted_function` | Definições de função deletadas com mensagens (= delete("should have a reason");) | `202403L` | (C++26) | P2573R2
`__cpp_designated_initializers` | Inicializadores designados | `201707L` | (C++20) | P0329R4
`__cpp_enumerator_attributes` | Atributos para enumeradores | `201411L` | (C++17) | N4266
`__cpp_explicit_this_parameter` | Parâmetro de objeto explícito | `202110L` | (C++23) | P0847R7
`__cpp_fold_expressions` | Expressões fold | `201603L` | (C++17) | N4295
P0036R0
Ordenação de constraints envolvendo expressões fold | `202406L` | (C++26) | P2963R3
`__cpp_generic_lambdas` | Expressões lambda genéricas | `201304L` | (C++14) | N3649
Lista explícita de parâmetros template para lambdas genéricas | `201707L` | (C++20) | P0428R2
`__cpp_guaranteed_copy_elision` | Elisão de cópia garantida através de categorias de valor simplificadas | `201606L` | (C++17) | P0135R1
`__cpp_hex_float` | Literais de ponto flutuante hexadecimais | `201603L` | (C++17) | P0245R1
`__cpp_if_consteval` | `if consteval` | `202106L` | (C++23) | P1938R3
`__cpp_if_constexpr` | `if constexpr` | `201606L` | (C++17) | P0292R2
`__cpp_impl_coroutine` | Coroutines (suporte do compilador) | `201902L` | (C++20) | P0912R5
LWG3393
`__cpp_impl_destroying_delete` | Destruindo `operator delete` (suporte do compilador) | `201806L` | (C++20) | P0722R3
`__cpp_impl_three_way_comparison` | Comparação de três vias (suporte do compilador) | `201907L` | (C++20) | P0515R3
P0768R1
P1185R2
P1630R1
`__cpp_implicit_move` | move implícito mais simples | `202207L` | (C++23) | P2266R3
`__cpp_inheriting_constructors` | Construtores herdados | `200802L` | (C++11) | N2540
Reformulação de construtores herdados: Nova especificação para construtores herdados (DR1941 et al) | `201511L`  // (C++17)
(DR11) | P0136R1
`__cpp_init_captures` | init-capture de lambda | `201304L` | (C++14) | N3648
Permitir expansão de pack em init-capture de lambda | `201803L` | (C++20) | P0780R2
`__cpp_initializer_lists` | Inicialização por lista e std::initializer_list | `200806L` | (C++11) | N2672
`__cpp_inline_variables` | Variáveis inline | `201606L` | (C++17) | P0386R2
`__cpp_lambdas` | Expressões lambda | `200907L` | (C++11) | N2927
`__cpp_modules` | Módulos | `201907L` | (C++20) | P1103R3
P1811R0
`__cpp_multidimensional_subscript` | Operador de subscrito multidimensional | `202110L` | (C++23) | P2128R6
[`operator[]`](<#/doc/language/operators>) estático | `202211L` | P2589R1
`__cpp_named_character_escapes` | Sequências de escape de caracteres universais nomeadas | `202207L` | (C++23) | P2071R2
`__cpp_namespace_attributes` | Atributos para namespaces | `201411L` | (C++17) | N4266
`__cpp_noexcept_function_type` | Fazer com que especificações de exceção façam parte do sistema de tipos | `201510L` | (C++17) | P0012R1
`__cpp_nontype_template_args` | Permitir avaliação constante para todos os argumentos template não-tipo | `201411L` | (C++17) | N4268
Tipos de classe e tipos de ponto flutuante em parâmetros template não-tipo | `201911L` | (C++20) | P1907R1
`__cpp_nontype_template_parameter_auto` | Declarando parâmetro template não-tipo com auto | `201606L` | (C++17) | P0127R2
`__cpp_nsdmi` | Inicializadores de membro de dados não-estáticos | `200809L` | (C++11) | N2756
`__cpp_pack_indexing` | Indexação de pack | `202311L` | (C++26) | P2662R3
`__cpp_placeholder_variables` | Um placeholder agradável sem nome | `202306L` | (C++26) | P2169R4
`__cpp_range_based_for` | Loop `for` baseado em range | `200907L` | (C++11) | N2930
Loop `for` baseado em range com tipos `begin`/`end` diferentes | `201603L` | (C++17) | P0184R0
Extensão de tempo de vida em for baseado em range | `202211L` | (C++23) | P2644R1
P2718R0
CWG2659
`__cpp_raw_strings` | Literais de string raw | `200710L` | (C++11) | N2442
`__cpp_ref_qualifiers` | ref-qualifiers | `200710L` | (C++11) | N2439
`__cpp_return_type_deduction` | Dedução de tipo de retorno para funções normais | `201304L` | (C++14) | N3638
`__cpp_rvalue_references` | Referência rvalue | `200610L` | (C++11) | N2118
`__cpp_size_t_suffix` | Sufixos literais para `std::size_t` e sua versão com sinal | `202011L` | (C++23) | P0330R8
`__cpp_sized_deallocation` | Desalocação dimensionada | `201309L` | (C++14) | N3778
`__cpp_static_assert` | `static_assert` | `200410L` | (C++11) | N1720
`static_assert` de argumento único | `201411L` | (C++17) | N3928
Mensagens de `static_assert` geradas pelo usuário | `202306L` | (C++26) | P2741R3
`__cpp_static_call_operator` | `operator()` estático | `202207L` | (C++23) | P1169R4
`__cpp_structured_bindings` | Structured bindings | `201606L` | (C++17) | P0217R3
Atributos para structured binding | `202403L` | (C++26) | P0609R3
Declaração de structured bindings como uma condição | `202406L` | P0963R3
Structured bindings podem introduzir um pack | `202411L` | P1061R10
`__cpp_template_template_args` | Correspondência de argumentos template template | `201611L` | (C++17) | P0522R0
`__cpp_threadsafe_static_init` | Inicialização e destruição dinâmica com concorrência | `200806L` | (C++11) | N2660
`__cpp_unicode_characters` | Novos tipos de caractere (char16_t e char32_t) | `200704L` | (C++11) | N2249
`__cpp_unicode_literals` | Literais de string Unicode | `200710L` | (C++11) | N2442
`__cpp_user_defined_literals` | Literais definidos pelo usuário | `200809L` | (C++11) | N2765
`__cpp_using_enum` | `using enum` | `201907L` | (C++20) | P1099R5
`__cpp_variable_templates` | Variable templates | `201304L` | (C++14) | N3651
`__cpp_variadic_friend` | Declarações friend variádicas | `202403L` | (C++26) | P2893R3
`__cpp_variadic_templates` | Variadic templates | `200704L` | (C++11) | N2242
`__cpp_variadic_using` | Expansões de pack em `using`-declarations | `201611L` | (C++17) | P0195R2
Número total de macros: 71
```
  
### Funcionalidades da biblioteca

As macros a seguir podem ser usadas para detectar se uma funcionalidade da standard library é implementada pela implementação atual. Diferentemente das macros de teste de funcionalidades da linguagem, elas não são predefinidas. Em vez disso, elas são fornecidas pelo header [`<version>`](<#/doc/header/version>).

Para cada macro de teste de funcionalidade da biblioteca, ela também é fornecida pelos headers que provêm os componentes relevantes da standard library. Veja [macros de teste de funcionalidades da biblioteca](<#/doc/utility/feature_test>) para uma lista completa de headers que fornecem essas macros.

Cada macro se expande para um literal inteiro correspondente ao ano e mês em que a funcionalidade correspondente foi incluída no rascunho de trabalho. Quando uma funcionalidade muda significativamente, a macro será atualizada de acordo.

```text
Nome da Macro | Funcionalidade | Valor | Std | Paper(s)   
---|---|---|---|---  
```
```text
`__cpp_lib_adaptor_iterator_pair_constructor` | Construtores de par de iteradores para std::stack e std::queue | `202106L` | (C++23) | P1425R4
`__cpp_lib_addressof_constexpr` | Constexpr std::addressof | `201603L` | (C++17) | LWG2296
`__cpp_lib_algorithm_default_value_type` | Habilitando list-initialization para algorithms | `202403L` | (C++26) | P2248R8
P3217R0
`__cpp_lib_algorithm_iterator_requirements` | Iteradores de Ranges como entradas para algoritmos não-Ranges algorithms | `202207L` | (C++23) | P2408R5
`__cpp_lib_aligned_accessor` | std::aligned_accessor: um accessor de std::mdspan que expressa o superalinhamento de ponteiro | `202411L` | (C++26) | P2897R7
`__cpp_lib_allocate_at_least` | Feedback de tamanho na interface do alocador, ex.: `std::allocator::allocate_at_least`, `std::allocator_traits::allocate_at_least` | `202302L` | (C++23) | P0401R6
P2652R2
LWG3887
`__cpp_lib_allocator_traits_is_always_equal` | `std::allocator_traits::is_always_equal`, limpezas noexcept | `201411L` | (C++17) | N4258
`__cpp_lib_any` | std::any | `201606L` | (C++17) | P0220R1
P0032R3
`__cpp_lib_apply` | std::apply | `201603L` | (C++17) | P0220R1
`__cpp_lib_array_constexpr` | Constexpr para std::reverse_iterator, std::move_iterator, std::array e range access | `201603L` | (C++17) | P0031R0
ConstexprIterator; comparação constexpr para std::array; diversos bits constexpr (std::array::fill et al.) | `201811L` | (C++20) | P0858R0
LWG3257
P1023R0
P1032R1
`__cpp_lib_as_const` | std::as_const | `201510L` | (C++17) | P0007R1
`__cpp_lib_associative_heterogeneous_erasure` | Remoção heterogênea em associative containers e unordered associative containers | `202110L` | (C++23) | P2077R3
`__cpp_lib_associative_heterogeneous_insertion` | Sobrecargas heterogêneas para as funções membro restantes em containers associativos ordenados e não ordenados | `202306L` | (C++26) | P2363R5
`__cpp_lib_assume_aligned` | std::assume_aligned | `201811L` | (C++20) | P1007R3
`__cpp_lib_atomic_flag_test` | std::atomic_flag::test | `201907L` | (C++20) | P1135R6
`__cpp_lib_atomic_float` | Atômicos de ponto flutuante | `201711L` | (C++20) | P0020R6
`__cpp_lib_atomic_is_always_lock_free` | Constexpr `std::atomic<T>::is_always_lock_free` | `201603L` | (C++17) | P0152R1
`__cpp_lib_atomic_lock_free_type_aliases` | Tipos integrais atômicos lock-free (std::atomic_signed_lock_free, std::atomic_unsigned_lock_free) | `201907L` | (C++20) | P1135R6
`__cpp_lib_atomic_min_max` | Mínimo/máximo atômico (`std::atomic::fetch_min`, `std::atomic::fetch_max`, etc) | `202403L` | (C++26) | P0493R5
`__cpp_lib_atomic_ref` | `std::atomic_ref` | `201806L` | (C++20) | P0019R8
`std::atomic_ref::address()` | `202411L` | (C++26) | P2835R7
`__cpp_lib_atomic_shared_ptr` | `std::atomic<std::shared_ptr>` | `201711L` | (C++20) | P0718R2
`__cpp_lib_atomic_value_initialization` | Corrigindo a inicialização atômica (inicializar por valor std::atomic por padrão) | `201911L` | (C++20) | P0883R2
`__cpp_lib_atomic_wait` | Espera eficiente de std::atomic | `201907L` | (C++20) | P1135R6
`__cpp_lib_barrier` | `std::barrier` | `201907L` | (C++20) | P1135R6
Garantias de conclusão de fase de `std::barrier` | `202302L` | (C++23) | P2588R3
`__cpp_lib_bind_back` | std::bind_back | `202202L` | (C++23) | P2387R3
Permitir a passagem de objetos chamáveis como argumentos de template não-tipo para std::bind_back | `202306L` | (C++26) | P2714R1
`__cpp_lib_bind_front` | `std::bind_front` | `201907L` | (C++20) | P0356R5
P1651R0
Permitir a passagem de objetos chamáveis como argumentos de template não-tipo para std::bind_front | `202306L` | (C++26) | P2714R1
`__cpp_lib_bit_cast` | `std::bit_cast` | `201806L` | (C++20) | P0476R2
`__cpp_lib_bitops` | Operações de bit | `201907L` | (C++20) | P0553R4
`__cpp_lib_bitset` | Interfaceando std::bitset com std::string_view | `202306L` | (C++26) | P2697R1
`__cpp_lib_bool_constant` | std::bool_constant | `201505L` | (C++17) | N4389
`__cpp_lib_bounded_array_traits` | `std::is_bounded_array`, `std::is_unbounded_array` | `201902L` | (C++20) | P1357R1
`__cpp_lib_boyer_moore_searcher` | Searchers | `201603L` | (C++17) | P0220R1
`__cpp_lib_byte` | `std::byte` | `201603L` | (C++17) | P0298R3
`__cpp_lib_byteswap` | `std::byteswap` | `202110L` | (C++23) | P1272R4
`__cpp_lib_char8_t` | Suporte da biblioteca para `char8_t` | `201907L` | (C++20) | P0482R6
P1423R3
`__cpp_lib_chrono` | Funções de arredondamento para std::chrono::duration e std::chrono::time_point | `201510L` | (C++17) | P0092R1
Constexpr para todas as funções membro de std::chrono::duration e std::chrono::time_point | `201611L` | P0505R0
Calendários e Fusos horários | `201907L` | (C++20) | P0355R7
P1466R3
Suporte a Hashing para classes de valor `std::chrono` | `202306L` | (C++26) | P2592R3
`__cpp_lib_chrono_udls` | Literais definidos pelo usuário para tipos de tempo | `201304L` | (C++14) | N3642
`__cpp_lib_clamp` | std::clamp | `201603L` | (C++17) | P0025R1
`__cpp_lib_common_reference` | Tornar std::common_reference_t de std::reference_wrapper um tipo de referência | `202302L` | (C++23) | P2655R3
`__cpp_lib_common_reference_wrapper` | Tornar std::common_reference_t de std::reference_wrapper um tipo de referência | `202302L` | (C++23) | P2655R3
`__cpp_lib_complex_udls` | Literais definidos pelo usuário para `std::complex` | `201309L` | (C++14) | N3779
`__cpp_lib_concepts` | Concepts da standard library | `202002L` | (C++20) | P0898R3
P1754R1
P1964R2
Tipos move-only para `equality_comparable_with`, `totally_ordered_with`, e `three_way_comparable_with` | `202207L` | (C++23) | P2404R3
`__cpp_lib_constexpr_algorithms` | Constexpr para algorithms | `201806L` | (C++20) | P0202R3
P0879R0
LWG3256
LWG3792
Ordenação estável constexpr | `202306L` | (C++26) | P2562R1
`__cpp_lib_constexpr_atomic` | constexpr std::atomic e std::atomic_ref | `202411L` | (C++26) | P3309R3
`__cpp_lib_constexpr_bitset` | Um std::bitset mais constexpr | `202207L` | (C++23) | P2417R2
`__cpp_lib_constexpr_charconv` | Constexpr para std::to_chars e std::from_chars para tipos integrais | `202207L` | (C++23) | P2291R3
`__cpp_lib_constexpr_cmath` | Constexpr para funções matemáticas em `<cmath>` e `<cstdlib>` | `202202L` | (C++23) | P0533R9
Mais constexpr para `<cmath>` | `202306L` | (C++26) | P1383R2
`__cpp_lib_constexpr_complex` | Constexpr para std::complex | `201711L` | (C++20) | P0415R1
Mais constexpr para `<complex>` | `202306L` | (C++26) | P1383R2
`__cpp_lib_constexpr_dynamic_alloc` | Constexpr para std::allocator e utilitários relacionados | `201907L` | (C++20) | P0784R7
`__cpp_lib_constexpr_exceptions` | constexpr para tipos de exceção, ex. std::bad_alloc, std::bad_cast etc. | `202411L` | (C++26) | P3068R6
`__cpp_lib_constexpr_functional` | Diversos bits constexpr (std::default_searcher); constexpr `INVOKE` | `201907L` | (C++20) | P1032R1
P1065R2
`__cpp_lib_constexpr_iterator` | Diversos bits constexpr (std::insert_iterator et al.) | `201811L` | (C++20) | P1032R1
`__cpp_lib_constexpr_memory` | Constexpr em std::pointer_traits | `201811L` | (C++20) | P1006R1
Constexpr std::unique_ptr | `202202L` | (C++23) | P2273R3
`__cpp_lib_constexpr_new` | Constexpr placement new | `202406L` | (C++26) | P2747R2
`__cpp_lib_constexpr_numeric` | Constexpr para algorithms em `<numeric>` | `201911L` | (C++20) | P1645R1
`__cpp_lib_constexpr_string` | constexpr std::char_traits | `201611L` | (C++17) | P0426R1
constexpr std::string | `201907L` | (C++20) | P0980R1
`__cpp_lib_constexpr_string_view` | Diversos bits constexpr (std::string_view::copy) | `201811L` | (C++20) | P1032R1
`__cpp_lib_constexpr_tuple` | Diversos bits constexpr (std::tuple::operator= et al.) | `201811L` | (C++20) | P1032R1
`__cpp_lib_constexpr_typeinfo` | Constexpr para std::type_info::operator== | `202106L` | (C++23) | P1328R1
`__cpp_lib_constexpr_utility` | Diversos bits constexpr (std::pair::operator= et al.) | `201811L` | (C++20) | P1032R1
`__cpp_lib_constexpr_vector` | Constexpr para std::vector | `201907L` | (C++20) | P1004R2
`__cpp_lib_constrained_equality` | Operadores relacionais restritos para `std::pair`, `std::tuple`, `std::optional`, e `std::variant` | `202403L` | (C++26) | P2944R3
Restringindo os operadores de igualdade de std::expected | `202411L` | P3379R0
`__cpp_lib_containers_ranges` | Construção e inserção cientes de Ranges para containers e strings | `202202L` | (C++23) | P1206R7
`__cpp_lib_copyable_function` | std::copyable_function | `202306L` | (C++26) | P2548R6
`__cpp_lib_coroutine` | Coroutines (suporte da biblioteca) | `201902L` | (C++20) | P0912R5
LWG3393
`__cpp_lib_debugging` | `<debugging>`: Suporte a depuração | `202311L` | (C++26) | P2546R5
`std::is_debugger_present` substituível | `202403L` | P2810R4
`__cpp_lib_destroying_delete` | Destruindo operator delete (suporte da biblioteca) | `201806L` | (C++20) | P0722R3
`__cpp_lib_enable_shared_from_this` | std::enable_shared_from_this::weak_from_this | `201603L` | (C++17) | P0033R1
`__cpp_lib_endian` | std::endian | `201907L` | (C++20) | P0463R1
P1612R1
`__cpp_lib_erase_if` | Remoção uniforme de container | `202002L` | (C++20) | P1209R0
P1115R3
`__cpp_lib_exchange_function` | std::exchange | `201304L` | (C++14) | N3668
`__cpp_lib_execution` | Políticas de execução | `201603L` | (C++17) | P0024R2
`std::execution::unsequenced_policy` | `201902L` | (C++20) | P1001R2
`__cpp_lib_expected` | template de classe std::expected | `202202L` | (C++23) | P0323R12
Funções monádicas para std::expected | `202211L` | P2505R5
`__cpp_lib_filesystem` | Biblioteca de sistema de arquivos | `201703L` | (C++17) | P0218R1
P0219R1
P0392R0
P0317R1
`__cpp_lib_flat_map` | `std::flat_map` e `std::flat_multimap` | `202207L` | (C++23) | P0429R9
`__cpp_lib_flat_set` | `std::flat_set` e `std::flat_multiset` | `202207L` | (C++23) | P1222R4
LWG3751
`__cpp_lib_format` | Formatação de texto | `201907L` | (C++20) | P0645R10
P1361R2
P1652R1
Verificações de string de formato em tempo de compilação; Reduzindo a parametrização de std::vformat_to | `202106L`  // (C++23)
(DR20) | P2216R3
Corrigindo o tratamento de locale em formatadores chrono; Suportando tipos não-formatáveis-const | `202110L` | P2372R3
P2418R2
Expondo `std::basic_format_string`; esclarecer o tratamento de codificações na formatação localizada de tipos chrono | `202207L` | (C++23) | P2419R2
P2508R1
Formatando ponteiros | `202304L` | (C++26) | P2510R3
Verificação de tipo de argumentos de formato | `202305L` | P2757R3
Membro `visit` | `202306L` | P2637R3
Strings de formato em tempo de execução | `202311L` | P2918R2
`__cpp_lib_format_path` | Formatação de std::filesystem::path | `202403L` | (C++26) | P2845R8
`__cpp_lib_format_ranges` | Formatando ranges | `202207L` | (C++23) | P2286R8
P2585R1
LWG3750
`__cpp_lib_format_uchar` | Corrigir a formatação de unidades de código como inteiros | `202311L` | (C++26) | P2909R4
`__cpp_lib_formatters` | Formatando std::thread::id e `std::stacktrace` | `202302L` | (C++23) | P2693R1
`__cpp_lib_forward_like` | `std::forward_like` | `202207L` | (C++23) | P2445R1
`__cpp_lib_freestanding_algorithm` | Facilidades freestanding em `<algorithm>` | `202311L` | (C++26) | P2407R5
`__cpp_lib_freestanding_array` | Tornar partes de std::array freestanding | `202311L` | (C++26) | P2407R5
`__cpp_lib_freestanding_char_traits` | std::char_traits freestanding | `202306L` | (C++26) | P2338R4
`__cpp_lib_freestanding_charconv` | Facilidades freestanding em `<charconv>` | `202306L` | (C++26) | P2338R4
`__cpp_lib_freestanding_cstdlib` | Facilidades freestanding em `<cstdlib>` | `202306L` | (C++26) | P2338R4
`__cpp_lib_freestanding_cstring` | Facilidades freestanding em `<cstring>` | `202306L` | (C++26) | P2338R4
Removendo std::strtok das facilidades freestanding | `202311L` | P2937R0
`__cpp_lib_freestanding_cwchar` | Facilidades freestanding em `<cwchar>` | `202306L` | (C++26) | P2338R4
`__cpp_lib_freestanding_errc` | std::errc freestanding | `202306L` | (C++26) | P2338R4
`__cpp_lib_freestanding_expected` | Tornar partes de std::expected freestanding | `202311L` | (C++26) | P2833R2
`__cpp_lib_freestanding_feature_test_macros` | Suporte para macros de teste de feature freestanding | `202306L` | (C++26) | P2198R7
`__cpp_lib_freestanding_functional` | Facilidades freestanding em `<functional>` | `202306L` | (C++26) | P2198R7
`__cpp_lib_freestanding_iterator` | Facilidades freestanding em `<iterator>` | `202306L` | (C++26) | P2198R7
`__cpp_lib_freestanding_mdspan` | std::mdspan freestanding | `202311L` | (C++26) | P2833R2
`__cpp_lib_freestanding_memory` | Facilidades freestanding em `<memory>` | `202306L` | (C++26) | P2198R7
`__cpp_lib_freestanding_numeric` | Facilidades freestanding em `<numeric>` (aritmética de saturação) | `202311L` | (C++26) | P0543R3
`__cpp_lib_freestanding_operator_new` | Definição de operator new (opcional em implementações freestanding) | `202306L` | (C++26) | P2198R7
`__cpp_lib_freestanding_optional` | Tornando partes de std::optional freestanding | `202311L` | (C++26) | P2407R5
`__cpp_lib_freestanding_ranges` | Facilidades freestanding em `<ranges>` | `202306L` | (C++26) | P2198R7
`__cpp_lib_freestanding_ratio` | Facilidades freestanding em `<ratio>` | `202306L` | (C++26) | P2198R7
`__cpp_lib_freestanding_string_view` | Tornando partes de std::string_view freestanding | `202311L` | (C++26) | P2407R5
`__cpp_lib_freestanding_tuple` | Facilidades freestanding em `<tuple>` | `202306L` | (C++26) | P2198R7
`__cpp_lib_freestanding_utility` | Facilidades freestanding em `<utility>` | `202306L` | (C++26) | P2198R7
`__cpp_lib_freestanding_variant` | Tornando partes de std::variant freestanding | `202311L` | (C++26) | P2407R5
`__cpp_lib_fstream_native_handle` | Obtendo handles nativos de streams de arquivo | `202306L` | (C++26) | P1759R6
`__cpp_lib_function_ref` | std::function_ref: Uma referência invocável com type-erasure | `202306L` | (C++26) | P0792R14
`__cpp_lib_gcd_lcm` | std::gcd, std::lcm | `201606L` | (C++17) | P0295R0
`__cpp_lib_generator` | std::generator: Gerador de corrotina síncrono para ranges | `202207L` | (C++23) | P2502R2
`__cpp_lib_generic_associative_lookup` | Busca de comparação heterogênea em containers associativos | `201304L` | (C++14) | N3657
`__cpp_lib_generic_unordered_lookup` | Busca de comparação heterogênea em containers associativos não ordenados | `201811L` | (C++20) | P0919R3
`__cpp_lib_hardware_interference_size` | Constexpr `std::hardware_{constructive, destructive}_interference_size` | `201703L` | (C++17) | P0154R1
`__cpp_lib_has_unique_object_representations` | std::has_unique_object_representations | `201606L` | (C++17) | P0258R2
`__cpp_lib_hazard_pointer` | `<hazard_pointer>`: Hazard pointers | `202306L` | (C++26) | P2530R3
`__cpp_lib_hypot` | Sobrecarga de 3 argumentos de std::hypot | `201603L` | (C++17) | P0030R1
`__cpp_lib_incomplete_container_elements` | Suporte mínimo a tipos incompletos para `std::forward_list`, `std::list`, e `std::vector` | `201505L` | (C++17) | N4510
`__cpp_lib_inplace_vector` | std::inplace_vector: Vetor redimensionável dinamicamente com capacidade fixa (armazenamento inplace) | `202406L` | (C++26) | P0843R14
`__cpp_lib_int_pow2` | Operações de potência de 2 inteiras (std::has_single_bit, std::bit_ceil, std::bit_floor, std::bit_width) | `202002L` | (C++20) | P0556R3
P1956R1
`__cpp_lib_integer_comparison_functions` | Funções de comparação de inteiros | `202002L` | (C++20) | P0586R2
`__cpp_lib_integer_sequence` | Sequências de inteiros em tempo de compilação | `201304L` | (C++14) | N3658
`__cpp_lib_integral_constant_callable` | std::integral_constant::operator() | `201304L` | (C++14) | N3545
`__cpp_lib_interpolate` | `std::lerp`, `std::midpoint` | `201902L` | (C++20) | P0811R3
`__cpp_lib_invoke` | std::invoke | `201411L` | (C++17) | N4169
`__cpp_lib_invoke_r` | `std::invoke_r` | `202106L` | (C++23) | P2136R3
`__cpp_lib_ios_noreplace` | Suporte a modo exclusivo para fstreams | `202207L` | (C++23) | P2467R1
`__cpp_lib_is_aggregate` | `std::is_aggregate` | `201703L` | (C++17) | LWG2911
`__cpp_lib_is_constant_evaluated` | `std::is_constant_evaluated` | `201811L` | (C++20) | P0595R2
`__cpp_lib_is_final` | std::is_final | `201402L` | (C++14) | LWG2112
`__cpp_lib_is_implicit_lifetime` | `std::is_implicit_lifetime` | `202302L` | (C++23) | P2674R1
`__cpp_lib_is_invocable` | std::is_invocable, std::invoke_result | `201703L` | (C++17) | P0604R0
`__cpp_lib_is_layout_compatible` | `std::is_layout_compatible` | `201907L` | (C++20) | P0466R5
`__cpp_lib_is_nothrow_convertible` | `std::is_convertible` | `201806L` | (C++20) | P0758R1
LWG3356
`__cpp_lib_is_null_pointer` | std::is_null_pointer | `201309L`  // (C++14)
(DR11) | LWG2247
`__cpp_lib_is_pointer_interconvertible` | Traits de interconversibilidade de ponteiros: `std::is_pointer_interconvertible_with_class`, `std::is_pointer_interconvertible_base_of` | `201907L` | (C++20) | P0466R5
`__cpp_lib_is_scoped_enum` | `std::is_scoped_enum` | `202011L` | (C++23) | P1048R1
`__cpp_lib_is_sufficiently_aligned` | std::is_sufficiently_aligned: verifica a pré-condição de alinhamento de um ponteiro | `202411L` | (C++26) | P2897R7
`__cpp_lib_is_swappable` | Traits (nothrow-)swappable | `201603L` | (C++17) | P0185R1
`__cpp_lib_is_virtual_base_of` | std::is_virtual_base_of: Type trait para detecção de classes base virtuais | `202406L` | (C++26) | P2985R0
`__cpp_lib_is_within_lifetime` | Verificando se uma alternativa de union está ativa (`std::is_within_lifetime`) | `202306L` | (C++26) | P2641R4
`__cpp_lib_jthread` | Stop token e joining thread | `201911L` | (C++20) | P0660R10
P1869R1
`__cpp_lib_latch` | `std::latch` | `201907L` | (C++20) | P1135R6
`__cpp_lib_launder` | CWG issue 1776: Substituição de objetos de classe contendo membros de referência (std::launder) | `201606L` | (C++17) | P0137R1
`__cpp_lib_linalg` | Uma interface de álgebra linear de função livre baseada no BLAS | `202311L` | (C++26) | P1673R13
`__cpp_lib_list_remove_return_type` | Altera o tipo de retorno de `remove()`, `remove_if()` e `unique()` de std::forward_list e std::list | `201806L` | (C++20) | P0646R1
`__cpp_lib_logical_traits` | Operações lógicas em type traits | `201510L` | (C++17) | P0013R1
`__cpp_lib_make_from_tuple` | std::make_from_tuple | `201606L` | (C++17) | P0209R2
`__cpp_lib_make_reverse_iterator` | `std::make_reverse_iterator` | `201402L` | (C++14) | LWG2285
`__cpp_lib_make_unique` | std::make_unique | `201304L` | (C++14) | N3656
`__cpp_lib_map_try_emplace` | std::map::try_emplace, std::map::insert_or_assign | `201411L` | (C++17) | N4279
`__cpp_lib_math_constants` | Constantes matemáticas | `201907L` | (C++20) | P0631R8
`__cpp_lib_math_special_functions` | Funções matemáticas especiais | `201603L` | (C++17) | P0226R1
`__cpp_lib_mdspan` | `std::mdspan` | `202207L` | (C++23) | P0009R18
P2599R2
P2604R0
P2613R1
std::dims para std::mdspan | `202406L` | (C++26) | P2389R2
`__cpp_lib_memory_resource` | std::pmr::memory_resource | `201603L` | (C++17) | P0220R1
`__cpp_lib_modules` | Módulos da biblioteca padrão `std` e `std.compat` | `202207L` | (C++23) | P2465R3
`__cpp_lib_move_iterator_concept` | Tornar std::move_iterator<T*> um iterator de acesso aleatório | `202207L` | (C++23) | P2520R0
`__cpp_lib_move_only_function` | std::move_only_function | `202110L` | (C++23) | P0288R9
`__cpp_lib_node_extract` | Unindo maps e sets (std::map::extract, std::map::merge, `insert(node_type)`, etc) | `201606L` | (C++17) | P0083R3
`__cpp_lib_nonmember_container_access` | std::size, std::data e std::empty | `201411L` | (C++17) | N4280
`__cpp_lib_not_fn` | std::not_fn | `201603L` | (C++17) | P0005R4
Permitir a passagem de objetos invocáveis como argumentos de template não-tipo para std::not_fn | `202306L` | (C++26) | P2714R1
`__cpp_lib_null_iterators` | LegacyForwardIterators nulos | `201304L` | (C++14) | N3644
`__cpp_lib_optional` | std::optional | `201606L` | (C++17) | P0220R1
P0032R3
P0307R2
std::optional totalmente constexpr | `202106L`  // (C++23)
(DR20) | P2231R1
Operações monádicas em std::optional | `202110L` | (C++23) | P0798R8
LWG3621
`__cpp_lib_optional_range_support` | Suporte a range para std::optional | `202406L` | (C++26) | P3168R2
`__cpp_lib_out_ptr` | std::out_ptr, std::inout_ptr | `202106L` | (C++23) | P1132R8
std::out_ptr, std::inout_ptr freestanding | `202311L` | (C++26) | P2833R2
`__cpp_lib_parallel_algorithm` | Algoritmos paralelos | `201603L` | (C++17) | P0024R2
`__cpp_lib_polymorphic_allocator` | std::pmr::polymorphic_allocator<> como um tipo de vocabulário | `201902L` | (C++20) | P0339R6
LWG3437
`__cpp_lib_print` | Saída formatada | `202207L` | (C++23) | P2093R14
Permitir uma implementação eficiente de std::print | `202403L`  // (C++26)
(DR23) | P3107R5
P3235R3
Imprimindo Linhas em Branco com std::println | `202403L` | (C++26) | P3142R0
`__cpp_lib_quoted_string_io` | std::quoted | `201304L` | (C++14) | N3654
`__cpp_lib_philox_engine` | std::philox_engine: Motor de números aleatórios baseado em contador | `202406L` | (C++26) | P2075R6
`__cpp_lib_ranges` | Biblioteca Ranges e algoritmos restritos | `201911L` | (C++20) | P0896R4
P1035R7
P1716R3
Views não default-initializable | `202106L`  // (C++23)
(DR20) | P2325R3
Views com ownership | `202110L` | P2415R2
`std::ranges::range_adaptor_closure` | `202202L` | (C++23) | P2387R3
Flexibilizando range adaptors para permitir tipos move-only | `202207L` | P2494R2
Removendo sobrecargas "poison pill" em ranges::begin, ranges::end, ranges::rbegin, ranges::rend, e ranges::size | `202211L` | P2602R2
Flexibilizando ranges para permitir certas projeções | `202302L` | P2609R3
Removendo o requisito de referência comum dos concepts indiretamente invocáveis | `202406L`  // (C++26)
(DR20) | P2997R1
`__cpp_lib_ranges_as_const` | std::const_iterator, `std::ranges::as_const_view` | `202207L` | (C++23) | P2278R4
Fazendo com que std::basic_const_iterator siga a convertibilidade de seu tipo subjacente | `202311L` | (C++26) | P2836R1
`__cpp_lib_ranges_as_rvalue` | `std::ranges::as_rvalue_view` | `202207L` | (C++23) | P2446R2
`__cpp_lib_ranges_cache_latest` | `std::ranges::cache_latest_view`") | `202411L` | (C++26) | P3138R5
`__cpp_lib_ranges_cartesian_product` | `std::ranges::cartesian_product_view` | `202207L` | (C++23) | P2374R4
P2540R1
`__cpp_lib_ranges_chunk` | `std::ranges::chunk_view` | `202202L` | (C++23) | P2442R1
`__cpp_lib_ranges_chunk_by` | `std::ranges::chunk_by_view` | `202202L` | (C++23) | P2443R1
`__cpp_lib_ranges_concat` | `std::ranges::concat_view` | `202403L` | (C++26) | P2542R8
`__cpp_lib_ranges_contains` | `std::ranges::contains` | `202207L` | (C++23) | P2302R4
`__cpp_lib_ranges_enumerate` | std::ranges::enumerate_view | `202302L` | (C++23) | P2164R9
`__cpp_lib_ranges_find_last` | `std::ranges::find_last`, `std::ranges::find_last_if`, e `std::ranges::find_last_if_not` | `202207L` | (C++23) | P1223R5
LWG3807
`__cpp_lib_ranges_fold` | `std::ranges` algoritmos fold | `202207L` | (C++23) | P2322R6
`__cpp_lib_ranges_generate_random` | API de vetor para geração de números aleatórios (`std::ranges::generate_random`) | `202403L` | (C++26) | P1068R11
`__cpp_lib_ranges_iota` | std::ranges::iota | `202202L` | (C++23) | P2440R1
`__cpp_lib_ranges_join_with` | std::ranges::join_with_view | `202202L` | (C++23) | P2441R2
`__cpp_lib_ranges_repeat` | `std::ranges::repeat_view` | `202207L` | (C++23) | P2474R2
`__cpp_lib_ranges_slide` | std::ranges::slide_view | `202202L` | (C++23) | P2442R1
`__cpp_lib_ranges_starts_ends_with` | std::ranges::starts_with, std::ranges::ends_with | `202106L` | (C++23) | P1659R3
`__cpp_lib_ranges_stride` | `std::ranges::stride_view` | `202207L` | (C++23) | P1899R3
`__cpp_lib_ranges_to_container` | std::ranges::to | `202202L` | (C++23) | P1206R7
`__cpp_lib_ranges_zip` | std::ranges::zip_view, std::ranges::zip_transform_view, std::ranges::adjacent_view, std::ranges::adjacent_transform_view | `202110L` | (C++23) | P2321R2
`__cpp_lib_ratio` | Adicionando os novos prefixos SI de 2022 | `202306L` | (C++26) | P2734R0
`__cpp_lib_raw_memory_algorithms` | Estendendo ferramentas de gerenciamento de memória | `201606L` | (C++17) | P0040R3
`constexpr` para algoritmos de memória especializados | `202411L` | (C++26) | P3508R0
P3369R0
`__cpp_lib_rcu` | `<rcu>`: Read-Copy Update (RCU) | `202306L` | (C++26) | P2545R4
`__cpp_lib_reference_from_temporary` | std::reference_constructs_from_temporary and std::reference_converts_from_temporary | `202202L` | (C++23) | P2255R2
`__cpp_lib_reference_wrapper` | Comparações para `std::reference_wrapper` | `202403L` | (C++26) | P2944R3
`__cpp_lib_remove_cvref` | `std::remove_cvref` | `201711L` | (C++20) | P0550R2
`__cpp_lib_result_of_sfinae` | std::result_of and SFINAE | `201210L` | (C++14) | N3462
`__cpp_lib_robust_nonmodifying_seq_ops` | Tornando operações de sequência não modificadoras mais robustas (sobrecargas de dois ranges para std::mismatch, std::equal e std::is_permutation) | `201304L` | (C++14) | N3671
`__cpp_lib_sample` | std::sample | `201603L` | (C++17) | P0220R1
`__cpp_lib_saturation_arithmetic` | Aritmética de saturação | `202311L` | (C++26) | P0543R3
`__cpp_lib_scoped_lock` | `std::scoped_lock` | `201703L` | (C++17) | P0156R2
`__cpp_lib_semaphore` | `std::counting_semaphore`, `std::binary_semaphore` | `201907L` | (C++20) | P1135R6
`__cpp_lib_senders` | std::execution: Modelo sender-receiver de controle de execução | `202406L` | (C++26) | P2300R10
`__cpp_lib_shared_mutex` | std::shared_mutex (não temporizado) | `201505L` | (C++17) | N4508
`__cpp_lib_shared_ptr_arrays` | [std::shared_ptr<T[]>](<#/doc/memory/shared_ptr>) | `201611L` | (C++17) | P0497R0
Suporte a arrays de std::make_shared | `201707L` | (C++20) | P0674R1
`__cpp_lib_shared_ptr_weak_type` | `shared_ptr::weak_type` | `201606L` | (C++17) | P0163R0
`__cpp_lib_shared_timed_mutex` | std::shared_timed_mutex | `201402L` | (C++14) | N3891
`__cpp_lib_shift` | `std::shift_left` e `std::shift_right` | `201806L` | (C++20) | P0769R2
std::ranges::shift_left e std::ranges::shift_right | `202202L` | (C++23) | P2440R1
`__cpp_lib_simd` | `<simd>`: Tipos de dados paralelos | `202411L` | (C++26) | P1928R15
`__cpp_lib_smart_ptr_for_overwrite` | Criação de smart pointer com inicialização padrão (std::allocate_shared_for_overwrite, std::make_shared_for_overwrite, std::make_unique_for_overwrite) | `202002L` | (C++20) | P1020R1
P1973R1
`__cpp_lib_smart_ptr_owner_equality` | Habilitando o uso de std::weak_ptr como chaves em containers associativos não ordenados | `202306L` | (C++26) | P1901R2
`__cpp_lib_source_location` | Captura de informações do código-fonte (std::source_location) | `201907L` | (C++20) | P1208R6
`__cpp_lib_span` | `std::span` | `202002L` | (C++20) | P0122R7
LWG3274
P1024R3
P1976R2
Tornando partes de `std::span` freestanding | `202311L` | (C++26) | P2821R5
P2833R2
`__cpp_lib_span_initializer_list` | Construindo `std::span` a partir de uma initializer list | `202311L` | (C++26) | P2447R6
`__cpp_lib_spanstream` | `std::spanbuf`, `std::spanstream` | `202106L` | (C++23) | P0448R4
`__cpp_lib_ssize` | `std::ssize` e unsigned `std::span::size` | `201902L` | (C++20) | P1227R2
`__cpp_lib_sstream_from_string_view` | Interligando std::stringstreams com std::string_view | `202306L` | (C++26) | P2495R3
`__cpp_lib_stacktrace` | Biblioteca de stacktrace | `202011L` | (C++23) | P0881R7
`__cpp_lib_start_lifetime_as` | Gerenciamento explícito de tempo de vida (std::start_lifetime_as) | `202207L` | (C++23) | P2590R2
`__cpp_lib_starts_ends_with` | Verificação de prefixo e sufixo de string (`starts_with()` e `ends_with()` para std::string e std::string_view) | `201711L` | (C++20) | P0457R2
`__cpp_lib_stdatomic_h` | Header de compatibilidade para operações atômicas C | `202011L` | (C++23) | P0943R6
`__cpp_lib_string_contains` | `contains()` para std::basic_string e std::basic_string_view | `202011L` | (C++23) | P1679R3
`__cpp_lib_string_resize_and_overwrite` | std::basic_string::resize_and_overwrite | `202110L` | (C++23) | P1072R10
`__cpp_lib_string_udls` | Literais definidos pelo usuário para tipos de string | `201304L` | (C++14) | N3642
`__cpp_lib_string_view` | std::string_view | `201606L` | (C++17) | P0220R1
P0254R2
ConstexprIterator | `201803L` | (C++20) | P0858R0
LWG3257
Concatenação de std::strings e std::string_views | `202403L` | (C++26) | P2591R5
`__cpp_lib_submdspan` | std::submdspan | `202306L` | (C++26) | P2630R4
Layouts mdspan preenchidos | `202403L` | (C++26) | P2642R6
`__cpp_lib_syncbuf` | ostream com buffer sincronizado (std::syncbuf, std::osyncstream) e manipuladores | `201803L` | (C++20) | P0053R7
P0753R2
`__cpp_lib_text_encoding` | std::text_encoding | `202306L` | (C++26) | P1885R12
`__cpp_lib_three_way_comparison` | Comparação de três vias (suporte de biblioteca); adicionando comparação de três vias à biblioteca | `201907L` | (C++20) | P0768R1
P1614R2
`__cpp_lib_to_address` | Utilitário para converter um ponteiro em um ponteiro bruto (std::to_address) | `201711L` | (C++20) | P0653R2
`__cpp_lib_to_array` | `std::to_array` | `201907L` | (C++20) | P0325R4
`__cpp_lib_to_chars` | Conversões elementares de string (`std::to_chars`, `std::from_chars`) | `201611L` | (C++17) | P0067R5
P0682R1
LWG3137
Testando o sucesso ou falha das funções de `<charconv>` | `202306L` | (C++26) | P2497R0
`__cpp_lib_to_string` | Redefinindo std::to_string em termos de std::format | `202306L` | (C++26) | P2587R3
`__cpp_lib_to_underlying` | `std::to_underlying` | `202102L` | (C++23) | P1682R3
`__cpp_lib_transformation_trait_aliases` | Alias templates para traits de transformação | `201304L` | (C++14) | N3655
`__cpp_lib_transparent_operators` | Functors de operador transparentes (std::less<> et al) | `201210L` | (C++14) | N3421
Transparente std::owner_less (`std::owner_less<void>`) | `201510L` | (C++17) | P0074R0
`__cpp_lib_tuple_element_t` | `std::tuple_element_t` | `201402L` | (C++14) | N3887
`__cpp_lib_tuple_like` | Compatibilidade entre std::tuple e objetos tipo tuple (std::pair, std::array, std::subrange) | `202207L` | (C++23) | P2165R4
Adicionar protocolo de tuple a std::complex | `202311L` | (C++26) | P2819R2
`__cpp_lib_tuples_by_type` | Acessando tuples por tipo | `201304L` | (C++14) | N3670
`__cpp_lib_type_identity` | std::type_identity | `201806L` | (C++20) | P0887R1
`__cpp_lib_type_trait_variable_templates` | Templates de variáveis de type traits (std::is_void_v, etc) | `201510L` | (C++17) | P0006R0
`__cpp_lib_uncaught_exceptions` | `std::uncaught_exceptions` | `201411L` | (C++17) | N4259
`__cpp_lib_unordered_map_try_emplace` | std::unordered_map::try_emplace, std::unordered_map::insert_or_assign | `201411L` | (C++17) | N4279
`__cpp_lib_unreachable` | std::unreachable | `202202L` | (C++23) | P0627R6
`__cpp_lib_unwrap_ref` | std::unwrap_ref_decay e std::unwrap_reference | `201811L` | (C++20) | P0318R1
LWG3348
`__cpp_lib_variant` | std::variant: Uma união type-safe para C++17 | `201606L` | (C++17) | P0088R3
P0393R3
P0032R3
`std::visit` para classes derivadas de std::variant | `202102L`  // (C++23)
(DR17) | P2162R2
Totalmente `constexpr` std::variant | `202106L`  // (C++23)
(DR20) | P2231R1
Membro `visit` | `202306L` | (C++26) | P2637R3
`__cpp_lib_void_t` | std::void_t | `201411L` | (C++17) | N3911
Número total de macros: 246
```
  
### Exemplo

#### Uso normal

Execute este código
```cpp
    #ifdef __has_include                           // Verifica se __has_include está presente
    #  if __has_include(<optional>)                // Verifica por uma biblioteca padrão
    #    include <optional>
    #  elif __has_include(<experimental/optional>) // Verifica por uma versão experimental
    #    include <experimental/optional>
    #  elif __has_include(<boost/optional.hpp>)    // Tenta com uma biblioteca externa
    #    include <boost/optional.hpp>
    #  else                                        // Não encontrado de forma alguma
    #     error "Missing <optional>"
    #  endif
    #endif
    
    #ifdef __has_cpp_attribute                      // Verifica se __has_cpp_attribute está presente
    #  if __has_cpp_attribute(deprecated)           // Verifica por um atributo
    #    define DEPRECATED(msg) [[deprecated(msg)]]
    #  endif
    #endif
    #ifndef DEPRECATED
    #    define DEPRECATED(msg)
    #endif
    
    DEPRECATED("foo() foi descontinuado") void foo();
    
    #if __cpp_constexpr >= 201304                // Verifica por uma versão específica de um recurso
    #  define CONSTEXPR constexpr
    #else
    #  define CONSTEXPR inline
    #endif
    
    CONSTEXPR int bar(unsigned i)
    {
    #if __cpp_binary_literals                    // Verifica pela presença de um recurso
        unsigned mask1 = 0b11000000;
        unsigned mask2 = 0b00000111;
    #else
        unsigned mask1 = 0xC0;
        unsigned mask2 = 0x07;
    #endif
        if (i & mask1)
            return 1;
        if (i & mask2)
            return 2;
        return 0;
    }
    
    int main() {}
```

#### Dump de Recursos do Compilador

O seguinte programa (compatível com C++11) faz um dump dos recursos e atributos do compilador C++. Note que o uso de __has_cpp_attribute() não é [conformante](<#/doc/feature_test>) e depende da implementação do gcc/clang.

Execute este código
```cpp
    static constexpr struct mude_estas_opcoes_para_selecionar_o_que_sera_impresso
    {
        constexpr static int longest_macro_name { 45 };
        constexpr static bool titles               = 1;
        constexpr static bool counters             = 1;
        constexpr static bool attributes           = 1;
        constexpr static bool standard_values      = 1;
        constexpr static bool compiler_specific    = 1;
        constexpr static bool core_features        = 1;
        constexpr static bool lib_features         = 1;
        constexpr static bool supported_features   = 1;
        constexpr static bool unsupported_features = 1;
        constexpr static bool sort_by_date         = 0;
        constexpr static bool separate_year_month  = 1;
        constexpr static bool separated_revisions  = 1;
        constexpr static bool latest_revisions     = 1;
        constexpr static bool cxx98                = 0;
        constexpr static bool cxx11                = 1;
        constexpr static bool cxx14                = 1;
        constexpr static bool cxx17                = 1;
        constexpr static bool cxx20                = 1;
        constexpr static bool cxx23                = 1;
        constexpr static bool cxx26                = 1;
        constexpr static bool cxx29                = 0;
    } print;
    
    #if __cplusplus < 201100
    #  error "C++11 ou superior é necessário"
    #endif
    
    #include <algorithm>
    #include <cstdio>
    #include <cstring>
    #include <utility>
    #include <vector>
    
    #ifdef __has_include
    # if __has_include(<version>)
    #   include <version>
    # endif
    #endif
    
    // Espera uma string que começa com 6 dígitos decimais ou com '_' (se não suportado)
    #define COMPILER_VALUE_INT(n) #n [0] == '_' ? 0 : \
        (#n[5] - '0') + (#n[4] - '0') * 10 + (#n[3] - '0') * 100 + \
        (#n[2] - '0') * 1000 + (#n[1] - '0') * 10000 + (#n[0] - '0') * 100000
    #define COMPILER_FEATURE_ENTRY(expect, name) { #name, COMPILER_VALUE_INT(name), expect },
    
    #if defined(__has_cpp_attribute) && defined(__GNUG__)
    # define COMPILER_ATTRIBUTE(expect, name) { #name, __has_cpp_attribute(name), expect },
    #else
    # define COMPILER_ATTRIBUTE(expect, name) { #name, COMPILER_VALUE_INT(name), expect },
    #endif
    
    #define COMPILER_SPECIFIC_STRING(value) #value
    #define COMPILER_SPECIFIC_ENTRY(name) { #name, COMPILER_SPECIFIC_STRING(name) },
    
    class CompilerFeature
    {
        char const* name_; long data_; long std_;
    public:
        constexpr CompilerFeature(char const* name, long data, long std)
            : name_(name), data_(data), std_(std) {}
        constexpr CompilerFeature(CompilerFeature const&) = default;
        CompilerFeature& operator=(CompilerFeature const&) = default;
        bool operator<(CompilerFeature const& rhs) const
            { return std::strcmp(name_, rhs.name_) < 0; }
        bool operator==(CompilerFeature const& rhs) const
            { return std::strcmp(name_, rhs.name_) == 0; }
        constexpr bool supported() const { return data_ >= std_; }
        constexpr bool maybe() const { return data_ > 0; }
        constexpr char const* name() const { return name_; }
        constexpr long std() const { return std_; }
        constexpr long data() const { return data_; }
        void data(long x) { data_ = x; }
    };
    
    static /*constexpr*/ std::pair<const char*, const char*> compiler[] = {
        COMPILER_SPECIFIC_ENTRY(__cplusplus) // não específico do compilador, mas útil :)
        COMPILER_SPECIFIC_ENTRY(__clang_major__)
        COMPILER_SPECIFIC_ENTRY(__clang_minor__)
        COMPILER_SPECIFIC_ENTRY(__clang_patchlevel__)
        COMPILER_SPECIFIC_ENTRY(__GNUG__)
        COMPILER_SPECIFIC_ENTRY(__GNUC_MINOR__)
        COMPILER_SPECIFIC_ENTRY(__GNUC_PATCHLEVEL__)
        // Adicione suas macros específicas do compilador favoritas. As não definidas não serão impressas.
    };
    
    static constexpr CompilerFeature cxx98_core[] = {
        COMPILER_FEATURE_ENTRY(199711L, __cpp_exceptions)
        COMPILER_FEATURE_ENTRY(199711L, __cpp_rtti)
    };
    
    static constexpr CompilerFeature cxx11_core[] = {
        COMPILER_FEATURE_ENTRY(200704L, __cpp_alias_templates)
        COMPILER_FEATURE_ENTRY(200809L, __cpp_attributes)
        COMPILER_FEATURE_ENTRY(200704L, __cpp_constexpr)
        COMPILER_FEATURE_ENTRY(201711L, __cpp_constexpr_in_decltype)
        COMPILER_FEATURE_ENTRY(200707L, __cpp_decltype)
        COMPILER_FEATURE_ENTRY(200604L, __cpp_delegating_constructors)
        COMPILER_FEATURE_ENTRY(201511L, __cpp_inheriting_constructors)
        COMPILER_FEATURE_ENTRY(200806L, __cpp_initializer_lists)
        COMPILER_FEATURE_ENTRY(200907L, __cpp_lambdas)
        COMPILER_FEATURE_ENTRY(200809L, __cpp_nsdmi)
        COMPILER_FEATURE_ENTRY(200907L, __cpp_range_based_for)
        COMPILER_FEATURE_ENTRY(200710L, __cpp_raw_strings)
        COMPILER_FEATURE_ENTRY(200710L, __cpp_ref_qualifiers)
        COMPILER_FEATURE_ENTRY(200610L, __cpp_rvalue_references)
        COMPILER_FEATURE_ENTRY(200410L, __cpp_static_assert)
        COMPILER_FEATURE_ENTRY(200806L, __cpp_threadsafe_static_init)
        COMPILER_FEATURE_ENTRY(200704L, __cpp_unicode_characters)
        COMPILER_FEATURE_ENTRY(200710L, __cpp_unicode_literals)
        COMPILER_FEATURE_ENTRY(200809L, __cpp_user_defined_literals)
        COMPILER_FEATURE_ENTRY(200704L, __cpp_variadic_templates)
    };
    
    static constexpr CompilerFeature cxx14_core[] = {
        COMPILER_FEATURE_ENTRY(201304L, __cpp_aggregate_nsdmi)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_binary_literals)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_constexpr)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_decltype_auto)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_generic_lambdas)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_init_captures)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_return_type_deduction)
        COMPILER_FEATURE_ENTRY(201309L, __cpp_sized_deallocation)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_variable_templates)
    };
    static constexpr CompilerFeature cxx14_lib[] = {
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_chrono_udls)
        COMPILER_FEATURE_ENTRY(201309L, __cpp_lib_complex_udls)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_exchange_function)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_generic_associative_lookup)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_integer_sequence)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_integral_constant_callable)
        COMPILER_FEATURE_ENTRY(201402L, __cpp_lib_is_final)
        COMPILER_FEATURE_ENTRY(201309L, __cpp_lib_is_null_pointer)
        COMPILER_FEATURE_ENTRY(201402L, __cpp_lib_make_reverse_iterator)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_make_unique)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_null_iterators)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_quoted_string_io)
        COMPILER_FEATURE_ENTRY(201210L, __cpp_lib_result_of_sfinae)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_robust_nonmodifying_seq_ops)
        COMPILER_FEATURE_ENTRY(201402L, __cpp_lib_shared_timed_mutex)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_string_udls)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_transformation_trait_aliases)
```
```cpp
        COMPILER_FEATURE_ENTRY(201210L, __cpp_lib_transparent_operators)
        COMPILER_FEATURE_ENTRY(201402L, __cpp_lib_tuple_element_t)
        COMPILER_FEATURE_ENTRY(201304L, __cpp_lib_tuples_by_type)
    };
     
    static constexpr CompilerFeature cxx17_core[] = {
        COMPILER_FEATURE_ENTRY(201603L, __cpp_aggregate_bases)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_aligned_new)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_capture_star_this)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_constexpr)
        COMPILER_FEATURE_ENTRY(201703L, __cpp_deduction_guides)
        COMPILER_FEATURE_ENTRY(201411L, __cpp_enumerator_attributes)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_fold_expressions)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_guaranteed_copy_elision)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_hex_float)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_if_constexpr)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_inline_variables)
        COMPILER_FEATURE_ENTRY(201411L, __cpp_namespace_attributes)
        COMPILER_FEATURE_ENTRY(201510L, __cpp_noexcept_function_type)
        COMPILER_FEATURE_ENTRY(201411L, __cpp_nontype_template_args)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_nontype_template_parameter_auto)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_range_based_for)
        COMPILER_FEATURE_ENTRY(201411L, __cpp_static_assert)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_structured_bindings)
        COMPILER_FEATURE_ENTRY(201611L, __cpp_template_template_args)
        COMPILER_FEATURE_ENTRY(201611L, __cpp_variadic_using)
    };
    static constexpr CompilerFeature cxx17_lib[] = {
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_addressof_constexpr)
        COMPILER_FEATURE_ENTRY(201411L, __cpp_lib_allocator_traits_is_always_equal)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_lib_any)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_apply)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_array_constexpr)
        COMPILER_FEATURE_ENTRY(201510L, __cpp_lib_as_const)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_atomic_is_always_lock_free)
        COMPILER_FEATURE_ENTRY(201505L, __cpp_lib_bool_constant)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_boyer_moore_searcher)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_byte)
        COMPILER_FEATURE_ENTRY(201611L, __cpp_lib_chrono)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_clamp)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_enable_shared_from_this)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_execution)
        COMPILER_FEATURE_ENTRY(201703L, __cpp_lib_filesystem)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_lib_gcd_lcm)
        COMPILER_FEATURE_ENTRY(201703L, __cpp_lib_hardware_interference_size)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_lib_has_unique_object_representations)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_hypot)
        COMPILER_FEATURE_ENTRY(201505L, __cpp_lib_incomplete_container_elements)
        COMPILER_FEATURE_ENTRY(201411L, __cpp_lib_invoke)
        COMPILER_FEATURE_ENTRY(201703L, __cpp_lib_is_aggregate)
        COMPILER_FEATURE_ENTRY(201703L, __cpp_lib_is_invocable)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_is_swappable)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_lib_launder)
        COMPILER_FEATURE_ENTRY(201510L, __cpp_lib_logical_traits)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_lib_make_from_tuple)
        COMPILER_FEATURE_ENTRY(201411L, __cpp_lib_map_try_emplace)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_math_special_functions)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_memory_resource)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_lib_node_extract)
        COMPILER_FEATURE_ENTRY(201411L, __cpp_lib_nonmember_container_access)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_not_fn)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_lib_optional)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_parallel_algorithm)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_lib_raw_memory_algorithms)
        COMPILER_FEATURE_ENTRY(201603L, __cpp_lib_sample)
        COMPILER_FEATURE_ENTRY(201703L, __cpp_lib_scoped_lock)
        COMPILER_FEATURE_ENTRY(201505L, __cpp_lib_shared_mutex)
        COMPILER_FEATURE_ENTRY(201611L, __cpp_lib_shared_ptr_arrays)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_lib_shared_ptr_weak_type)
        COMPILER_FEATURE_ENTRY(201606L, __cpp_lib_string_view)
        COMPILER_FEATURE_ENTRY(201611L, __cpp_lib_to_chars)
        COMPILER_FEATURE_ENTRY(201510L, __cpp_lib_transparent_operators)
        COMPILER_FEATURE_ENTRY(201510L, __cpp_lib_type_trait_variable_templates)
        COMPILER_FEATURE_ENTRY(201411L, __cpp_lib_uncaught_exceptions)
        COMPILER_FEATURE_ENTRY(201411L, __cpp_lib_unordered_map_try_emplace)
        COMPILER_FEATURE_ENTRY(202102L, __cpp_lib_variant)
        COMPILER_FEATURE_ENTRY(201411L, __cpp_lib_void_t)
    };
     
    static constexpr CompilerFeature cxx20_core[] = {
        COMPILER_FEATURE_ENTRY(201902L, __cpp_aggregate_paren_init)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_char8_t)
        COMPILER_FEATURE_ENTRY(202002L, __cpp_concepts)
        COMPILER_FEATURE_ENTRY(201806L, __cpp_conditional_explicit)
        COMPILER_FEATURE_ENTRY(202211L, __cpp_consteval)
        COMPILER_FEATURE_ENTRY(202002L, __cpp_constexpr)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_constexpr_dynamic_alloc)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_constinit)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_deduction_guides)
        COMPILER_FEATURE_ENTRY(201707L, __cpp_designated_initializers)
        COMPILER_FEATURE_ENTRY(201707L, __cpp_generic_lambdas)
        COMPILER_FEATURE_ENTRY(201902L, __cpp_impl_coroutine)
        COMPILER_FEATURE_ENTRY(201806L, __cpp_impl_destroying_delete)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_impl_three_way_comparison)
        COMPILER_FEATURE_ENTRY(201803L, __cpp_init_captures)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_modules)
        COMPILER_FEATURE_ENTRY(201911L, __cpp_nontype_template_args)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_using_enum)
    };
    static constexpr CompilerFeature cxx20_lib[] = {
        COMPILER_FEATURE_ENTRY(201811L, __cpp_lib_array_constexpr)
        COMPILER_FEATURE_ENTRY(201811L, __cpp_lib_assume_aligned)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_atomic_flag_test)
        COMPILER_FEATURE_ENTRY(201711L, __cpp_lib_atomic_float)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_atomic_lock_free_type_aliases)
        COMPILER_FEATURE_ENTRY(201806L, __cpp_lib_atomic_ref)
        COMPILER_FEATURE_ENTRY(201711L, __cpp_lib_atomic_shared_ptr)
        COMPILER_FEATURE_ENTRY(201911L, __cpp_lib_atomic_value_initialization)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_atomic_wait)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_barrier)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_bind_front)
        COMPILER_FEATURE_ENTRY(201806L, __cpp_lib_bit_cast)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_bitops)
        COMPILER_FEATURE_ENTRY(201902L, __cpp_lib_bounded_array_traits)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_char8_t)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_chrono)
        COMPILER_FEATURE_ENTRY(202002L, __cpp_lib_concepts)
        COMPILER_FEATURE_ENTRY(201806L, __cpp_lib_constexpr_algorithms)
        COMPILER_FEATURE_ENTRY(201711L, __cpp_lib_constexpr_complex)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_constexpr_dynamic_alloc)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_constexpr_functional)
        COMPILER_FEATURE_ENTRY(201811L, __cpp_lib_constexpr_iterator)
        COMPILER_FEATURE_ENTRY(201811L, __cpp_lib_constexpr_memory)
        COMPILER_FEATURE_ENTRY(201911L, __cpp_lib_constexpr_numeric)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_constexpr_string)
        COMPILER_FEATURE_ENTRY(201811L, __cpp_lib_constexpr_string_view)
        COMPILER_FEATURE_ENTRY(201811L, __cpp_lib_constexpr_tuple)
        COMPILER_FEATURE_ENTRY(201811L, __cpp_lib_constexpr_utility)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_constexpr_vector)
        COMPILER_FEATURE_ENTRY(201902L, __cpp_lib_coroutine)
        COMPILER_FEATURE_ENTRY(201806L, __cpp_lib_destroying_delete)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_endian)
        COMPILER_FEATURE_ENTRY(202002L, __cpp_lib_erase_if)
        COMPILER_FEATURE_ENTRY(201902L, __cpp_lib_execution)
        COMPILER_FEATURE_ENTRY(202110L, __cpp_lib_format)
        COMPILER_FEATURE_ENTRY(201811L, __cpp_lib_generic_unordered_lookup)
        COMPILER_FEATURE_ENTRY(202002L, __cpp_lib_int_pow2)
        COMPILER_FEATURE_ENTRY(202002L, __cpp_lib_integer_comparison_functions)
        COMPILER_FEATURE_ENTRY(201902L, __cpp_lib_interpolate)
        COMPILER_FEATURE_ENTRY(201811L, __cpp_lib_is_constant_evaluated)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_is_layout_compatible)
        COMPILER_FEATURE_ENTRY(201806L, __cpp_lib_is_nothrow_convertible)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_is_pointer_interconvertible)
        COMPILER_FEATURE_ENTRY(201911L, __cpp_lib_jthread)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_latch)
        COMPILER_FEATURE_ENTRY(201806L, __cpp_lib_list_remove_return_type)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_math_constants)
        COMPILER_FEATURE_ENTRY(202106L, __cpp_lib_optional)
        COMPILER_FEATURE_ENTRY(201902L, __cpp_lib_polymorphic_allocator)
        COMPILER_FEATURE_ENTRY(202110L, __cpp_lib_ranges)
        COMPILER_FEATURE_ENTRY(201711L, __cpp_lib_remove_cvref)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_semaphore)
        COMPILER_FEATURE_ENTRY(201707L, __cpp_lib_shared_ptr_arrays)
        COMPILER_FEATURE_ENTRY(201806L, __cpp_lib_shift)
        COMPILER_FEATURE_ENTRY(202002L, __cpp_lib_smart_ptr_for_overwrite)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_source_location)
        COMPILER_FEATURE_ENTRY(202002L, __cpp_lib_span)
        COMPILER_FEATURE_ENTRY(201902L, __cpp_lib_ssize)
        COMPILER_FEATURE_ENTRY(201711L, __cpp_lib_starts_ends_with)
        COMPILER_FEATURE_ENTRY(201803L, __cpp_lib_string_view)
        COMPILER_FEATURE_ENTRY(201803L, __cpp_lib_syncbuf)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_three_way_comparison)
        COMPILER_FEATURE_ENTRY(201711L, __cpp_lib_to_address)
        COMPILER_FEATURE_ENTRY(201907L, __cpp_lib_to_array)
        COMPILER_FEATURE_ENTRY(201806L, __cpp_lib_type_identity)
        COMPILER_FEATURE_ENTRY(201811L, __cpp_lib_unwrap_ref)
        COMPILER_FEATURE_ENTRY(202106L, __cpp_lib_variant)
    };
     
    static constexpr CompilerFeature cxx23_core[] = {
        COMPILER_FEATURE_ENTRY(202110L, __cpp_auto_cast)
        COMPILER_FEATURE_ENTRY(202211L, __cpp_constexpr)
        COMPILER_FEATURE_ENTRY(202110L, __cpp_explicit_this_parameter)
        COMPILER_FEATURE_ENTRY(202106L, __cpp_if_consteval)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_implicit_move)
        COMPILER_FEATURE_ENTRY(202211L, __cpp_multidimensional_subscript)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_named_character_escapes)
        COMPILER_FEATURE_ENTRY(202211L, __cpp_range_based_for)
        COMPILER_FEATURE_ENTRY(202011L, __cpp_size_t_suffix)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_static_call_operator)
    };
    static constexpr CompilerFeature cxx23_lib[] = {
        COMPILER_FEATURE_ENTRY(202106L, __cpp_lib_adaptor_iterator_pair_constructor)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_algorithm_iterator_requirements)
        COMPILER_FEATURE_ENTRY(202302L, __cpp_lib_allocate_at_least)
        COMPILER_FEATURE_ENTRY(202110L, __cpp_lib_associative_heterogeneous_erasure)
        COMPILER_FEATURE_ENTRY(202302L, __cpp_lib_barrier)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_bind_back)
        COMPILER_FEATURE_ENTRY(202110L, __cpp_lib_byteswap)
        COMPILER_FEATURE_ENTRY(202302L, __cpp_lib_common_reference)
        COMPILER_FEATURE_ENTRY(202302L, __cpp_lib_common_reference_wrapper)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_concepts)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_constexpr_bitset)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_constexpr_charconv)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_constexpr_cmath)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_constexpr_memory)
        COMPILER_FEATURE_ENTRY(202106L, __cpp_lib_constexpr_typeinfo)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_containers_ranges)
        COMPILER_FEATURE_ENTRY(202211L, __cpp_lib_expected)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_flat_map)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_flat_set)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_format)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_format_ranges)
        COMPILER_FEATURE_ENTRY(202302L, __cpp_lib_formatters)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_forward_like)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_generator)
        COMPILER_FEATURE_ENTRY(202106L, __cpp_lib_invoke_r)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_ios_noreplace)
        COMPILER_FEATURE_ENTRY(202302L, __cpp_lib_is_implicit_lifetime)
        COMPILER_FEATURE_ENTRY(202011L, __cpp_lib_is_scoped_enum)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_mdspan)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_modules)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_move_iterator_concept)
        COMPILER_FEATURE_ENTRY(202110L, __cpp_lib_move_only_function)
        COMPILER_FEATURE_ENTRY(202110L, __cpp_lib_optional)
        COMPILER_FEATURE_ENTRY(202106L, __cpp_lib_out_ptr)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_print)
        COMPILER_FEATURE_ENTRY(202302L, __cpp_lib_ranges)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_ranges_as_const)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_ranges_as_rvalue)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_ranges_cartesian_product)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_ranges_chunk)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_ranges_chunk_by)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_ranges_contains)
        COMPILER_FEATURE_ENTRY(202302L, __cpp_lib_ranges_enumerate)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_ranges_find_last)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_ranges_fold)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_ranges_iota)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_ranges_join_with)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_ranges_repeat)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_ranges_slide)
        COMPILER_FEATURE_ENTRY(202106L, __cpp_lib_ranges_starts_ends_with)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_ranges_stride)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_ranges_to_container)
        COMPILER_FEATURE_ENTRY(202110L, __cpp_lib_ranges_zip)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_reference_from_temporary)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_shift)
        COMPILER_FEATURE_ENTRY(202106L, __cpp_lib_spanstream)
        COMPILER_FEATURE_ENTRY(202011L, __cpp_lib_stacktrace)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_start_lifetime_as)
        COMPILER_FEATURE_ENTRY(202011L, __cpp_lib_stdatomic_h)
        COMPILER_FEATURE_ENTRY(202011L, __cpp_lib_string_contains)
        COMPILER_FEATURE_ENTRY(202110L, __cpp_lib_string_resize_and_overwrite)
        COMPILER_FEATURE_ENTRY(202102L, __cpp_lib_to_underlying)
        COMPILER_FEATURE_ENTRY(202207L, __cpp_lib_tuple_like)
        COMPILER_FEATURE_ENTRY(202202L, __cpp_lib_unreachable)
    };
     
    static constexpr CompilerFeature cxx26_core[] = {
        //< Continuar a Popular
        COMPILER_FEATURE_ENTRY(202406L, __cpp_constexpr)
        COMPILER_FEATURE_ENTRY(202411L, __cpp_constexpr_exceptions)
        COMPILER_FEATURE_ENTRY(202403L, __cpp_deleted_function)
        COMPILER_FEATURE_ENTRY(202406L, __cpp_fold_expressions)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_pack_indexing)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_placeholder_variables)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_static_assert)
        COMPILER_FEATURE_ENTRY(202411L, __cpp_structured_bindings)
        COMPILER_FEATURE_ENTRY(202403L, __cpp_variadic_friend)
    };
    static constexpr CompilerFeature cxx26_lib[] = {
        //< Continuar a Popular
        COMPILER_FEATURE_ENTRY(202403L, __cpp_lib_algorithm_default_value_type)
        COMPILER_FEATURE_ENTRY(202411L, __cpp_lib_aligned_accessor)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_associative_heterogeneous_insertion)
        COMPILER_FEATURE_ENTRY(202403L, __cpp_lib_atomic_min_max)
        COMPILER_FEATURE_ENTRY(202411L, __cpp_lib_atomic_ref)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_bind_back)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_bind_front)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_bitset)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_chrono)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_constexpr_algorithms)
        COMPILER_FEATURE_ENTRY(202411L, __cpp_lib_constexpr_atomic)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_constexpr_cmath)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_constexpr_complex)
        COMPILER_FEATURE_ENTRY(202411L, __cpp_lib_constexpr_exceptions)
        COMPILER_FEATURE_ENTRY(202406L, __cpp_lib_constexpr_new)
        COMPILER_FEATURE_ENTRY(202411L, __cpp_lib_constrained_equality)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_copyable_function)
        COMPILER_FEATURE_ENTRY(202403L, __cpp_lib_debugging)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_format)
        COMPILER_FEATURE_ENTRY(202403L, __cpp_lib_format_path)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_format_uchar)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_freestanding_algorithm)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_freestanding_array)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_char_traits)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_charconv)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_cstdlib)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_freestanding_cstring)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_cwchar)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_errc)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_freestanding_expected)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_feature_test_macros)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_functional)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_iterator)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_freestanding_mdspan)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_memory)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_freestanding_numeric)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_operator_new)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_freestanding_optional)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_ranges)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_ratio)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_freestanding_string_view)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_tuple)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_freestanding_utility)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_freestanding_variant)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_fstream_native_handle)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_function_ref)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_hazard_pointer)
        COMPILER_FEATURE_ENTRY(202406L, __cpp_lib_inplace_vector)
        COMPILER_FEATURE_ENTRY(202406L, __cpp_lib_is_virtual_base_of)
        COMPILER_FEATURE_ENTRY(202411L, __cpp_lib_is_sufficiently_aligned)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_is_within_lifetime)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_linalg)
        COMPILER_FEATURE_ENTRY(202406L, __cpp_lib_mdspan)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_not_fn)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_out_ptr)
        COMPILER_FEATURE_ENTRY(202406L, __cpp_lib_optional_range_support)
        COMPILER_FEATURE_ENTRY(202406L, __cpp_lib_philox_engine)
        COMPILER_FEATURE_ENTRY(202403L, __cpp_lib_print)
        COMPILER_FEATURE_ENTRY(202406L, __cpp_lib_ranges)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_ranges_as_const)
        COMPILER_FEATURE_ENTRY(202411L, __cpp_lib_ranges_cache_latest)
        COMPILER_FEATURE_ENTRY(202403L, __cpp_lib_ranges_concat)
        COMPILER_FEATURE_ENTRY(202403L, __cpp_lib_ranges_generate_random)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_ratio)
        COMPILER_FEATURE_ENTRY(202411L, __cpp_lib_raw_memory_algorithms)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_rcu)
        COMPILER_FEATURE_ENTRY(202403L, __cpp_lib_reference_wrapper)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_saturation_arithmetic)
        COMPILER_FEATURE_ENTRY(202406L, __cpp_lib_senders)
        COMPILER_FEATURE_ENTRY(202411L, __cpp_lib_simd)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_smart_ptr_owner_equality)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_span)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_span_initializer_list)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_sstream_from_string_view)
        COMPILER_FEATURE_ENTRY(202403L, __cpp_lib_string_view)
        COMPILER_FEATURE_ENTRY(202403L, __cpp_lib_submdspan)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_text_encoding)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_to_chars)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_to_string)
        COMPILER_FEATURE_ENTRY(202311L, __cpp_lib_tuple_like)
        COMPILER_FEATURE_ENTRY(202306L, __cpp_lib_variant)
    };
     
    static constexpr CompilerFeature cxx29_core[] = {
        //< Continuar a Popular
        COMPILER_FEATURE_ENTRY(202604L, __cpp_core_TODO)
    };
    static constexpr CompilerFeature cxx29_lib[] = {
        //< Continuar a Popular
        COMPILER_FEATURE_ENTRY(202604L, __cpp_lib_TODO)
    };
     
    static constexpr CompilerFeature attributes[] = {
        COMPILER_ATTRIBUTE(202207L, assume)
        COMPILER_ATTRIBUTE(200809L, carries_dependency)
        COMPILER_ATTRIBUTE(201309L, deprecated)
        COMPILER_ATTRIBUTE(201603L, fallthrough)
        COMPILER_ATTRIBUTE(202403L, indeterminate)
        COMPILER_ATTRIBUTE(201803L, likely)
        COMPILER_ATTRIBUTE(201603L, maybe_unused)
        COMPILER_ATTRIBUTE(201803L, no_unique_address)
        COMPILER_ATTRIBUTE(201907L, nodiscard)
        COMPILER_ATTRIBUTE(200809L, noreturn)
        COMPILER_ATTRIBUTE(201803L, unlikely)
    };
     
    inline void show_compiler_specific_info()
    {
        std::printf("Macros específicas do compilador:\n");
        for (auto co : compiler)
            if (std::strcmp(co.first, co.second))
                std::printf("%*s %s\n", -print.longest_macro_name, co.first, co.second);
    }
     
    inline void print_compiler_feature(const CompilerFeature& x)
    {
        if (not ((print.supported_features and x.maybe()) or
                (print.unsupported_features and not x.maybe())))
            return;
        auto print_year_month = 
        {
            return std::printf("%ld%s%02ld",
                n / 100, print.separate_year_month ? "-" : "", n % 100);
        };
        std::printf("%*s ", -print.longest_macro_name, x.name());
        x.maybe() ? print_year_month(x.data()) :
                        std::printf("------%s", print.separate_year_month ? "-" : "");
        if (print.standard_values)
            std::printf("  %c  ", (x.supported() ? (x.data() > x.std() ? '>' : '=') : '<')),
                print_year_month(x.std());
        std::puts("");
    }
     
    template<class Container>
    inline void show(char const* const title, Container const& co)
    {
        if (print.titles)
        {
            std::printf("%-s (", title);
            if (print.counters)
            {
                std::printf("%zd/", std::count_if(std::begin(co), std::end(co),
                    
                    {
                        return x.supported();
                    }));
            }
            std::printf("%td)\n", std::distance(std::begin(co), std::end(co)));
        }
        if (print.sort_by_date)
        {
            std::vector<CompilerFeature> v(std::begin(co), std::end(co));
            std::stable_sort(v.begin(), v.end(),
                
                {
                    return lhs.data() < rhs.data();
                });
            std::for_each(v.cbegin(), v.cend(), print_compiler_feature);
        }
        else
            std::for_each(std::begin(co), std::end(co), print_compiler_feature);
        std::puts("");
    }
     
    inline void show_latest()
    {
        auto latest_rev =  -> int
        {
            return print.cxx29 ? 29 : print.cxx26 ? 26 : print.cxx23 ? 23 : print.cxx20 ? 20 :
                   print.cxx17 ? 17 : print.cxx14 ? 14 : print.cxx11 ? 11 : 98;
        };
        std::vector<CompilerFeature> latest;
        auto add = &latest
        {
            auto i = std::lower_bound(latest.begin(), latest.end(), x);
            if (i == latest.end() or not (*i == x))
                latest.insert(i, x);
            else if (i->data() < x.data())
                i->data(x.data());
        };
        char text[64];
        latest.reserve(512); // macros máximas
        if (print.core_features)
        {   // preservar a ordem de inserção de revisão inversa!
            if (print.cxx29) std::for_each(std::begin(cxx29_core), std::end(cxx29_core), add);
            if (print.cxx26) std::for_each(std::begin(cxx26_core), std::end(cxx26_core), add);
            if (print.cxx23) std::for_each(std::begin(cxx23_core), std::end(cxx23_core), add);
            if (print.cxx20) std::for_each(std::begin(cxx20_core), std::end(cxx20_core), add);
            if (print.cxx17) std::for_each(std::begin(cxx17_core), std::end(cxx17_core), add);
            if (print.cxx14) std::for_each(std::begin(cxx14_core), std::end(cxx14_core), add);
            if (print.cxx11) std::for_each(std::begin(cxx11_core), std::end(cxx11_core), add);
            if (print.cxx98) std::for_each(std::begin(cxx98_core), std::end(cxx98_core), add);
            std::snprintf(text, sizeof text, "TODAS AS MACROS CORE ATÉ C++%02i", latest_rev());
            show(text, latest);
        }
        latest.clear();
        if (print.lib_features)
        {   // preservar a ordem de inserção de revisão inversa!
            if (print.cxx29) std::for_each(std::begin(cxx29_lib), std::end(cxx29_lib), add);
            if (print.cxx26) std::for_each(std::begin(cxx26_lib), std::end(cxx26_lib), add);
            if (print.cxx23) std::for_each(std::begin(cxx23_lib), std::end(cxx23_lib), add);
            if (print.cxx20) std::for_each(std::begin(cxx20_lib), std::end(cxx20_lib), add);
            if (print.cxx17) std::for_each(std::begin(cxx17_lib), std::end(cxx17_lib), add);
            if (print.cxx14) std::for_each(std::begin(cxx14_lib), std::end(cxx14_lib), add);
            std::snprintf(text, sizeof text, "TODAS AS MACROS LIB ATÉ C++%02i", latest_rev());
            show(text, latest);
        }
    }
     
    int main()
    {
        if (print.separated_revisions)
        {
            if (print.cxx98 and print.core_features) show("C++98 CORE", cxx98_core);
            if (print.cxx11 and print.core_features) show("C++11 CORE", cxx11_core);
            if (print.cxx14 and print.core_features) show("C++14 CORE", cxx14_core);
            if (print.cxx14 and print.lib_features ) show("C++14 LIB" , cxx14_lib);
            if (print.cxx17 and print.core_features) show("C++17 CORE", cxx17_core);
            if (print.cxx17 and print.lib_features ) show("C++17 LIB" , cxx17_lib);
            if (print.cxx20 and print.core_features) show("C++20 CORE", cxx20_core);
            if (print.cxx20 and print.lib_features ) show("C++20 LIB" , cxx20_lib);
            if (print.cxx23 and print.core_features) show("C++23 CORE", cxx23_core);
            if (print.cxx23 and print.lib_features ) show("C++23 LIB" , cxx23_lib);
            if (print.cxx26 and print.core_features) show("C++26 CORE", cxx26_core);
            if (print.cxx26 and print.lib_features ) show("C++26 LIB" , cxx26_lib);
            if (print.cxx29 and print.core_features) show("C++29 CORE", cxx29_core);
            if (print.cxx29 and print.lib_features ) show("C++29 LIB" , cxx29_lib);
        }
        if (print.latest_revisions) show_latest();
        if (print.attributes) show("ATRIBUTOS", attributes);
        if (print.compiler_specific) show_compiler_specific_info();
    }
```

Possible output:
```
    C++11 CORE (20/20)
    __cpp_alias_templates                         2007-04  =  2007-04
    __cpp_attributes                              2008-09  =  2008-09
    __cpp_constexpr                               2022-11  >  2007-04
    __cpp_constexpr_in_decltype                   2017-11  =  2017-11
    ... truncado ...
     
    C++14 CORE (9/9)
    __cpp_aggregate_nsdmi                         2013-04  =  2013-04
    __cpp_binary_literals                         2013-04  =  2013-04
    __cpp_constexpr                               2022-11  >  2013-04
    ... truncado ...
     
    C++14 LIB (20/20)
    __cpp_lib_chrono_udls                         2013-04  =  2013-04
    __cpp_lib_complex_udls                        2013-09  =  2013-09
    __cpp_lib_exchange_function                   2013-04  =  2013-04
    ... truncado ...
     
    ... truncado ...
     
    C++23 LIB (43/64)
    __cpp_lib_adaptor_iterator_pair_constructor   2021-06  =  2021-06
    __cpp_lib_algorithm_iterator_requirements     -------  <  2022-07
    __cpp_lib_allocate_at_least                   -------  <  2023-02
    __cpp_lib_associative_heterogeneous_erasure   -------  <  2021-10
    __cpp_lib_barrier                             2019-07  <  2023-02
    ... truncado ...
     
    TODAS AS MACROS CORE ATÉ C++26 (60/71)
    __cpp_aggregate_bases                         2016-03  =  2016-03
    __cpp_aggregate_nsdmi                         2013-04  =  2013-04
    __cpp_aggregate_paren_init                    2019-02  =  2019-02
    __cpp_alias_templates                         2007-04  =  2007-04
    ... truncado ...
     
    TODAS AS MACROS LIB ATÉ C++26 (158/246)
    __cpp_lib_adaptor_iterator_pair_constructor   2021-06  =  2021-06
```
__cpp_lib_addressof_constexpr                 2016-03  =  2016-03
__cpp_lib_algorithm_iterator_requirements     -------  <  2022-07
__cpp_lib_allocate_at_least                   -------  <  2023-02
__cpp_lib_allocator_traits_is_always_equal    2014-11  =  2014-11
... truncated ...
```

ATRIBUTOS (9/11)
```
assume                                        2022-07  =  2022-07
carries_dependency                            -------  <  2008-09
deprecated                                    2013-09  =  2013-09
fallthrough                                   2016-03  =  2016-03
... truncated ...
```

Macros específicos do compilador:
```
__cplusplus                                   202302L
__GNUG__                                      14
__GNUC_MINOR__                                2
__GNUC_PATCHLEVEL__                           0
```text

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto
---|---|---|---
P2552R3 | C++20  | `__has_cpp_attribute` deve expandir para um valor não-zero para atributos padrão  | pode expandir para ​0​

### Veja também

**Macros de teste de recursos da biblioteca** (C++20) |  definidos no header `<version>`
---|---
**Símbolos de Macro Predefinidos**
**Índice de Símbolos de Macro**

### Links externos

1\.  | O documento oficial sobre Recomendações de Teste de Recursos
---|---
2\.  | Código-fonte para despejar recursos do compilador
```