# Objetos de função

Um _objeto de função_ é qualquer objeto para o qual o operador de chamada de função é definido. C++ fornece muitos objetos de função embutidos, bem como suporte para a criação e manipulação de novos objetos de função.

### Invocação de função

A operação apenas para exposição `_INVOKE_`(f, arg_0, arg_1, arg_2, ..., arg_N) é definida como segue: Seja o tipo `Obj` o tipo não qualificado de arg_0 (ou seja, [std::remove_cv](<#/doc/types/remove_cv>)<[std::remove_reference](<#/doc/types/remove_reference>)<decltype(arg_0)>::type>::type)

  * Se f é um [ponteiro para função membro](<#/doc/language/pointer>) da classe `C`, então `_INVOKE_`(f, obj, arg_1, arg_2, ..., arg_N) é equivalente a:

  * Se [std::is_same](<#/doc/types/is_same>)<C, Obj>::value || [std::is_base_of](<#/doc/types/is_base_of>)<C, Obj>::value for true

  * (obj.*f)(arg_1, arg_2, ..., arg_N) (invoca a função membro no objeto).

  * Se `Obj` é uma especialização de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)

  * (obj.get().*f)(arg_1, arg_2, ..., arg_N) (invoca a função membro no objeto referenciado especialmente).

  * Caso contrário

  * ((*obj).*f)(arg_1, arg_2, ..., arg_N) (invoca a função membro no objeto desreferenciado).

  * Caso contrário, se N == 0 e f é um [ponteiro para membro de dados](<#/doc/language/pointer>) da classe `C`, então `_INVOKE_`(mptr, obj) é equivalente a:

  * Se [std::is_same](<#/doc/types/is_same>)<C, Obj>::value || [std::is_base_of](<#/doc/types/is_base_of>)<C, Obj>::value for true

  * obj.*mptr (acessa o membro de dados do objeto).

  * Se `Obj` é uma especialização de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)

  * obj.get().*mptr (acessa o membro de dados do objeto referenciado especialmente).

  * Caso contrário

  * (*obj).*mptr (acessa o membro de dados do objeto desreferenciado).

  * Caso contrário

  * `_INVOKE_`(f, arg_0, arg_1, arg_2, ..., arg_N) é equivalente a f(arg_0, arg_1, arg_2, ..., arg_N) (invoca o callable).

A operação apenas para exposição `_INVOKE <R>_`(f, arg_0, arg_1, arg_2, ..., arg_N) é definida como segue:

  * Se `R` é void (possivelmente cv-qualificado)

  * static_cast&lt;void&gt;(`_INVOKE_`(f, arg_0, arg_1, arg_2, ..., arg_N)).

  * Caso contrário

  * `_INVOKE_`(f, arg_0, arg_1, arg_2, ..., arg_N) implicitamente convertido para `R`.

| Seja o tipo `Actual` decltype(`_INVOKE_`(f, arg_0, arg_1, arg_2, ..., arg_N))

  * Se [`std::reference_converts_from_temporary_v`](<#/doc/types/reference_converts_from_temporary>) <R, Actual> for true

  * `_INVOKE <R>_`(f, arg_0, arg_1, arg_2, ..., arg_N) é malformado.

| (desde C++23)
(desde C++11)

`std::invoke` e `std::invoke_r`(desde C++23) podem invocar qualquer objeto [Callable](<#/doc/named_req/Callable>) com os argumentos fornecidos de acordo com as regras de `_INVOKE_` e `_INVOKE <R>_`(desde C++23).

[ invokeinvoke_r](<#/doc/utility/functional/invoke>)(C++17)(C++23) | invoca qualquer objeto [Callable](<#/doc/named_req/Callable>) com os argumentos fornecidos e possibilidade de especificar o tipo de retorno(desde C++23)
(function template)

### Wrappers de função

Essas classes wrapper polimórficas fornecem suporte para armazenar objetos de função arbitrários.

[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto callable copiável
(class template)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper move-only de qualquer objeto callable que suporte qualificadores em uma dada assinatura de chamada
(class template)
[ copyable_function](<#/doc/utility/functional/copyable_function>)(C++26) | wrapper copiável de qualquer objeto callable copiável que suporte qualificadores em uma dada assinatura de chamada
(class template)
[ function_ref](<#/doc/utility/functional/function_ref>)(C++26) | wrapper sem posse de qualquer objeto callable
(class template)
[ bad_function_call](<#/doc/utility/functional/bad_function_call>)(C++11) | a exceção lançada ao invocar um [std::function](<#/doc/utility/functional/function>) vazio
(class)
[ mem_fn](<#/doc/utility/functional/mem_fn>)(C++11) | cria um objeto de função a partir de um ponteiro para membro
(function template)

### Identidade

std::identity é o objeto de função identidade: ele retorna seu argumento inalterado.

[ identity](<#/doc/utility/functional/identity>)(C++20) | objeto de função que retorna seu argumento inalterado
(class)

### Aplicação parcial de função

[std::bind_front](<#/doc/utility/functional/bind_front>) e [std::bind](<#/doc/utility/functional/bind>) fornecem suporte para [aplicação parcial de função](<https://en.wikipedia.org/wiki/Partial_application> "enwiki:Partial application"), ou seja, vincular argumentos a funções para produzir novas funções.

[ bind_frontbind_back](<#/doc/utility/functional/bind_front>)(C++20)(C++23) | vincula um número variável de argumentos, em ordem, a um objeto de função
(function template)
[ bind](<#/doc/utility/functional/bind>)(C++11) | vincula um ou mais argumentos a um objeto de função
(function template)
[ is_bind_expression](<#/doc/utility/functional/is_bind_expression>)(C++11) | indica que um objeto é uma expressão `std::bind` ou pode ser usado como tal
(class template)
[ is_placeholder](<#/doc/utility/functional/is_placeholder>)(C++11) | indica que um objeto é um placeholder padrão ou pode ser usado como tal
(class template)
Definido no namespace `std::placeholders`

```cpp
 _1, _2, _3, _4, ...(C++11)
(constant)
```

### Negadores

[std::not_fn](<#/doc/utility/functional/not_fn>) cria um objeto de função que nega o resultado do objeto callable passado a ele.

[ not_fn](<#/doc/utility/functional/not_fn>)(C++17) | cria um objeto de função que retorna o complemento do resultado do objeto de função que ele contém
(function template)

### Buscadores

Buscadores que implementam vários algoritmos de busca de strings são fornecidos e podem ser usados diretamente ou com [std::search](<#/doc/algorithm/search>).

[ default_searcher](<#/doc/utility/functional/default_searcher>)(C++17) | implementação do algoritmo de busca da biblioteca padrão C++
(class template)
[ boyer_moore_searcher](<#/doc/utility/functional/boyer_moore_searcher>)(C++17) | implementação do algoritmo de busca Boyer-Moore
(class template)
[ boyer_moore_horspool_searcher](<#/doc/utility/functional/boyer_moore_horspool_searcher>)(C++17) | implementação do algoritmo de busca Boyer-Moore-Horspool
(class template)

### Wrappers de referência

Wrappers de referência permitem que argumentos de referência sejam armazenados em objetos de função copiáveis:

[ reference_wrapper](<#/doc/utility/functional/reference_wrapper>)(C++11) | wrapper de referência [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>)
(class template)
[ refcref](<#/doc/utility/functional/ref>)(C++11)(C++11) | cria um [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>) com um tipo deduzido de seu argumento
(function template)
[ unwrap_referenceunwrap_ref_decay](<#/doc/utility/functional/unwrap_reference>)(C++20)(C++20) | obtém o tipo de referência encapsulado em [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)
(class template)

### Objetos de função transparentes

[Contêineres associativos](<#/doc/container>) e [contêineres associativos não ordenados](<#/doc/container>)(desde C++20) fornecem operações de busca heterogênea e remoção(desde C++23), mas elas são habilitadas apenas se o tipo de objeto de função `T` fornecido for _transparente_: o identificador qualificado `T::is_transparent` é válido e denota um tipo. Todos os tipos de objetos de função transparentes na standard library definem um tipo aninhado `is_transparent`. No entanto, tipos de objetos de função transparentes definidos pelo usuário não precisam fornecer diretamente `is_transparent` como um tipo aninhado: ele pode ser definido em uma classe base, desde que `T::is_transparent` satisfaça o requisito de transparência declarado acima. | (desde C++14)

### Objetos de função de operador

C++ define os seguintes objetos de função que representam operações aritméticas e lógicas comuns.

As especializações void deduzem seus tipos de parâmetro e tipos de retorno de seus argumentos, e todas são [transparentes](<#/doc/utility/functional>). | (desde C++14)

##### Operações aritméticas

---
[ plus](<#/doc/utility/functional/plus>) | objeto de função que implementa x + y
(class template)
[ plus&lt;void&gt;](<#/doc/utility/functional/plus_void>)(C++14) | objeto de função que implementa x + y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ minus](<#/doc/utility/functional/minus>) | objeto de função que implementa x - y
(class template)
[ minus&lt;void&gt;](<#/doc/utility/functional/minus_void>)(C++14) | objeto de função que implementa x - y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ multiplies](<#/doc/utility/functional/multiplies>) | objeto de função que implementa x * y
(class template)
[ multiplies&lt;void&gt;](<#/doc/utility/functional/multiplies_void>)(C++14) | objeto de função que implementa x * y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ divides](<#/doc/utility/functional/divides>) | objeto de função que implementa x / y
(class template)
[ divides&lt;void&gt;](<#/doc/utility/functional/divides_void>)(C++14) | objeto de função que implementa x / y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ modulus](<#/doc/utility/functional/modulus>) | objeto de função que implementa x % y
(class template)
[ modulus&lt;void&gt;](<#/doc/utility/functional/modulus_void>)(C++14) | objeto de função que implementa x % y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ negate](<#/doc/utility/functional/negate>) | objeto de função que implementa -x
(class template)
[ negate&lt;void&gt;](<#/doc/utility/functional/negate_void>)(C++14) | objeto de função que implementa -x deduzindo tipos de parâmetro e retorno
(class template specialization)

##### Comparações

[ equal_to](<#/doc/utility/functional/equal_to>) | objeto de função que implementa x == y
(class template)
[ equal_to&lt;void&gt;](<#/doc/utility/functional/equal_to_void>)(C++14) | objeto de função que implementa x == y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ not_equal_to](<#/doc/utility/functional/not_equal_to>) | objeto de função que implementa x != y
(class template)
[ not_equal_to&lt;void&gt;](<#/doc/utility/functional/not_equal_to_void>)(C++14) | objeto de função que implementa x != y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ greater](<#/doc/utility/functional/greater>) | objeto de função que implementa x > y
(class template)
[ greater&lt;void&gt;](<#/doc/utility/functional/greater_void>)(C++14) | objeto de função que implementa x > y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ less](<#/doc/utility/functional/less>) | objeto de função que implementa x < y
(class template)
[ less&lt;void&gt;](<#/doc/utility/functional/less_void>)(C++14) | objeto de função que implementa x < y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ greater_equal](<#/doc/utility/functional/greater_equal>) | objeto de função que implementa x >= y
(class template)
[ greater_equal&lt;void&gt;](<#/doc/utility/functional/greater_equal_void>)(C++14) | objeto de função que implementa x >= y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ less_equal](<#/doc/utility/functional/less_equal>) | objeto de função que implementa x <= y
(class template)
[ less_equal&lt;void&gt;](<#/doc/utility/functional/less_equal_void>)(C++14) | objeto de função que implementa x <= y deduzindo tipos de parâmetro e retorno
(class template specialization)

##### Operações lógicas

[ logical_and](<#/doc/utility/functional/logical_and>) | objeto de função que implementa x && y
(class template)
[ logical_and&lt;void&gt;](<#/doc/utility/functional/logical_and_void>)(C++14) | objeto de função que implementa x && y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ logical_or](<#/doc/utility/functional/logical_or>) | objeto de função que implementa x || y
(class template)
[ logical_or&lt;void&gt;](<#/doc/utility/functional/logical_or_void>)(C++14) | objeto de função que implementa x || y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ logical_not](<#/doc/utility/functional/logical_not>) | objeto de função que implementa !x
(class template)
[ logical_not&lt;void&gt;](<#/doc/utility/functional/logical_not_void>)(C++14) | objeto de função que implementa !x deduzindo tipos de parâmetro e retorno
(class template specialization)

##### Operações bit a bit

[ bit_and](<#/doc/utility/functional/bit_and>) | objeto de função que implementa x & y
(class template)
[ bit_and&lt;void&gt;](<#/doc/utility/functional/bit_and_void>)(C++14) | objeto de função que implementa x & y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ bit_or](<#/doc/utility/functional/bit_or>) | objeto de função que implementa x | y
(class template)
[ bit_or&lt;void&gt;](<#/doc/utility/functional/bit_or_void>)(C++14) | objeto de função que implementa x | y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ bit_xor](<#/doc/utility/functional/bit_xor>) | objeto de função que implementa x ^ y
(class template)
[ bit_xor&lt;void&gt;](<#/doc/utility/functional/bit_xor_void>)(C++14) | objeto de função que implementa x ^ y deduzindo tipos de parâmetro e retorno
(class template specialization)
[ bit_not](<#/doc/utility/functional/bit_not>)(C++14) | objeto de função que implementa ~x
(class template)
[ bit_not&lt;void&gt;](<#/doc/utility/functional/bit_not_void>)(C++14) | objeto de função que implementa ~x deduzindo tipos de parâmetro e retorno
(class template specialization)

### Objetos de função de comparação restritos

Os seguintes objetos de função de comparação são [restritos](<#/doc/language/constraints>).

  * Os operadores de igualdade (`ranges::equal_to` e `ranges::not_equal_to`) exigem que os tipos dos argumentos satisfaçam [`equality_comparable_with`](<#/doc/concepts/equality_comparable>).
  * Os operadores relacionais (`ranges::less`, `ranges::greater`, `ranges::less_equal` e `ranges::greater_equal`) exigem que os tipos dos argumentos satisfaçam [`totally_ordered_with`](<#/doc/concepts/totally_ordered>).
  * O operador de comparação de três vias (`compare_three_way`) exige que o tipo modele [`three_way_comparable_with`](<#/doc/utility/compare/three_way_comparable>).

Todos esses objetos de função são [transparentes](<#/doc/utility/functional>). | [ ranges::equal_to](<#/doc/utility/functional/ranges/equal_to>)(C++20) | objeto de função restrito que implementa x == y
(class)
[ ranges::not_equal_to](<#/doc/utility/functional/ranges/not_equal_to>)(C++20) | objeto de função restrito que implementa x != y
(class)
[ ranges::less](<#/doc/utility/functional/ranges/less>)(C++20) | objeto de função restrito que implementa x < y
(class)
[ ranges::greater](<#/doc/utility/functional/ranges/greater>)(C++20) | objeto de função restrito que implementa x > y
(class)
[ ranges::less_equal](<#/doc/utility/functional/ranges/less_equal>)(C++20) | objeto de função restrito que implementa x <= y
(class)
[ ranges::greater_equal](<#/doc/utility/functional/ranges/greater_equal>)(C++20) | objeto de função restrito que implementa x >= y
(class)
[ compare_three_way](<#/doc/utility/compare/compare_three_way>)(C++20) | objeto de função restrito que implementa x <=> y
(class)
(desde C++20)

### Itens auxiliares

```cpp
Os seguintes itens apenas para exposição são usados para vários componentes na standard library, mas não fazem parte da interface da standard library. | template< class Fn, class... Args >
concept /*callable*/ =
requires (Fn&& fn, Args&&... args) {
std::forward<Fn>(fn)(std::forward<Args>(args)...);
};  // (1) (apenas para exposição*)
template< class Fn, class... Args >
concept /*nothrow-callable*/ =
/*callable*/<Fn, Args...> &&
requires (Fn&& fn, Args&&... args) {
{ std::forward<Fn>(fn)(std::forward<Args>(args)...) } noexcept;
};  // (2) (apenas para exposição*)
template< class Fn, class... Args >
using /*call-result-t*/ = decltype(std::declval<Fn>()(std::declval<Args>()...));  // (3) (apenas para exposição*)
template< const auto& T >
using /*decayed-typeof*/ = decltype(auto(T));  // (4) (apenas para exposição*)
```

(desde C++26)

### Binders e adaptadores antigos

Várias utilidades que forneciam suporte funcional inicial foram descontinuadas e removidas: |

##### Base

---
[ unary_function](<#/doc/utility/functional/unary_function>)(deprecated in C++11)(removed in C++17) | classe base de função unária compatível com adaptador
(class template)
[ binary_function](<#/doc/utility/functional/binary_function>)(deprecated in C++11)(removed in C++17) | classe base de função binária compatível com adaptador
(class template)

##### Binders

[ binder1stbinder2nd](<#/doc/utility/functional/binder12>)(deprecated in C++11)(removed in C++17) | objeto de função que contém uma função binária e um de seus argumentos
(class template)
[ bind1stbind2nd](<#/doc/utility/functional/bind12>)(deprecated in C++11)(removed in C++17) | vincula um argumento a uma função binária
(function template)

##### Adaptadores de função

[ pointer_to_unary_function](<#/doc/utility/functional/pointer_to_unary_function>)(deprecated in C++11)(removed in C++17) | wrapper compatível com adaptador para um ponteiro para função unária
(class template)
[ pointer_to_binary_function](<#/doc/utility/functional/pointer_to_binary_function>)(deprecated in C++11)(removed in C++17) | wrapper compatível com adaptador para um ponteiro para função binária
(class template)
[ ptr_fun](<#/doc/utility/functional/ptr_fun>)(deprecated in C++11)(removed in C++17) | cria um wrapper de objeto de função compatível com adaptador a partir de um ponteiro para função
(function template)
[ mem_fun_tmem_fun1_tconst_mem_fun_tconst_mem_fun1_t](<#/doc/utility/functional/mem_fun_t>)(deprecated in C++11)(removed in C++17) | wrapper para um ponteiro para função membro nula ou unária, invocável com um ponteiro para objeto
(class template)
[ mem_fun](<#/doc/utility/functional/mem_fun>)(deprecated in C++11)(removed in C++17) | cria um wrapper a partir de um ponteiro para função membro, invocável com um ponteiro para objeto
(function template)
[ mem_fun_ref_tmem_fun1_ref_tconst_mem_fun_ref_tconst_mem_fun1_ref_t](<#/doc/utility/functional/mem_fun_ref_t>)(deprecated in C++11)(removed in C++17) | wrapper para um ponteiro para função membro nula ou unária, invocável com uma referência para objeto
(class template)
[ mem_fun_ref](<#/doc/utility/functional/mem_fun_ref>)(deprecated in C++11)(removed in C++17) | cria um wrapper a partir de um ponteiro para função membro, invocável com uma referência para objeto
(function template)
[ unary_negate](<#/doc/utility/functional/unary_negate>)(deprecated in C++17)(removed in C++20) | objeto de função wrapper que retorna o complemento do predicado unário que ele contém
(class template)
[ binary_negate](<#/doc/utility/functional/binary_negate>)(deprecated in C++17)(removed in C++20) | objeto de função wrapper que retorna o complemento do predicado binário que ele contém
(class template)
[ not1](<#/doc/utility/functional/not1>)(deprecated in C++17)(removed in C++20) | constrói um objeto [std::unary_negate](<#/doc/utility/functional/unary_negate>) personalizado
(function template)
[ not2](<#/doc/utility/functional/not2>)(deprecated in C++17)(removed in C++20) | constrói um objeto [std::binary_negate](<#/doc/utility/functional/binary_negate>) personalizado
(function template)
(até C++20)

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 185](<https://cplusplus.github.io/LWG/issue185>) | C++98 | usar objetos de função melhorava a eficiência do programa | removeu a afirmação
[LWG 660](<https://cplusplus.github.io/LWG/issue660>) | C++98 | objetos de função para operações bit a bit estavam faltando | adicionado
[LWG 2149](<https://cplusplus.github.io/LWG/issue2149>) | C++98 | objetos de função que recebiam um ou dois argumentos eram obrigados a
fornecer tipos aninhados para denotar os tipos de argumento e resultado | não é mais exigido
[LWG 2219](<https://cplusplus.github.io/LWG/issue2219>) | C++11 | `_INVOKE_` não lidava corretamente com [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>) | lida corretamente
[LWG 2420](<https://cplusplus.github.io/LWG/issue2420>) | C++11 | `_INVOKE <R>_` não descartava o valor de retorno se `R` fosse void | descarta o valor de retorno neste caso
[LWG 2926](<https://cplusplus.github.io/LWG/issue2926>)  
([P0604R0](<https://wg21.link/P0604R0>))  | C++11 | a sintaxe da operação `_INVOKE_` com um tipo de retorno
`R` era `_INVOKE_`(f, t1, t2, ..., tN, R) | alterado para
` _INVOKE <R>_`(f, t1, t2, ..., tN)
[LWG 3655](<https://cplusplus.github.io/LWG/issue3655>) | C++11 | `_INVOKE_` não lidava corretamente com uniões
devido à resolução do [LWG issue 2219](<https://cplusplus.github.io/LWG/issue2219>) | lida corretamente