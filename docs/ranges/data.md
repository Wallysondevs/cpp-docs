# std::ranges::data

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ data = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr std::remove_reference_t<
ranges::range_reference_t<T>>* data( T&& t );
```

Retorna um ponteiro para o primeiro elemento de um range contíguo.

Se `T` é um tipo de array e [std::remove_all_extents_t](<#/doc/types/remove_all_extents>)<[std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;> estiver incompleto, então a chamada para `ranges::data` é malformada, sem diagnóstico obrigatório.

Se o argumento é um lvalue ou [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> é verdadeiro, uma chamada para `ranges::data` é [equivalente em expressão](<#/doc/language/expressions>) a:

  1. [`_decay-copy_`](<#/doc/standard_library/decay-copy>)(t.data())(até C++23)auto(t.data())(desde C++23), se essa expressão for válida e seu tipo for um ponteiro para um tipo de objeto.
  2. Caso contrário, [std::to_address](<#/doc/memory/to_address>)([ranges::begin](<#/doc/ranges/begin>)(t)), se a expressão [ranges::begin](<#/doc/ranges/begin>)(t) for válida e seu tipo modelar [std::contiguous_iterator](<#/doc/iterator/contiguous_iterator>).

Em todos os outros casos, uma chamada para `ranges::data` é malformada, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando `ranges::data(e)` aparece no contexto imediato de uma instanciação de template.

### Objetos de ponto de customização

O nome `ranges::data` denota um _objeto de ponto de customização_ , que é um [objeto de função](<#/doc/named_req/FunctionObject>) `const` de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___data_fn_`.

Todas as instâncias de `___data_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___data_fn_` nos mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é obrigada a ser invocável). Assim, `ranges::data` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `ranges::data` acima, `___data_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__data_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __data_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__data_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __data_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___data_fn_` participa da resolução de sobrecarga.

### Notas

Se o argumento é um rvalue (ou seja, `T` é um tipo de objeto) e [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> é falso, a chamada para `ranges::data` é malformada, o que também resulta em falha de substituição.

Se `ranges::data(e)` é válido para uma expressão `e`, então ele retorna um ponteiro para um objeto.

O padrão C++20 exige que, se a chamada de função `data` subjacente retornar um prvalue, o valor de retorno seja construído por movimento a partir do objeto temporário materializado. Todas as implementações retornam diretamente o prvalue. O requisito é corrigido pela proposta pós-C++20 [P0849R8](<https://wg21.link/P0849R8>) para corresponder às implementações.

### Exemplo

Execute este código
```cpp
    #include <cstring>
    #include <iostream>
    #include <ranges>
    #include <string>
    
    int main()
    {
        std::string s{"Hello world!\n"};
    
        char a[20]; // storage for a C-style string
        std::strcpy(a, std::ranges::data(s));
        // [data(s), data(s) + size(s)] is guaranteed to be an NTBS
    
        std::cout << a;
    }
```

Saída:
```
    Hello world!
```

### Veja também

[ ranges::cdata](<#/doc/ranges/cdata>)(C++20) | obtém um ponteiro para o início de um range contíguo somente leitura
(objeto de ponto de customização)
[ ranges::begin](<#/doc/ranges/begin>)(C++20) | retorna um iterator para o início de um range
(objeto de ponto de customização)
[ data](<#/doc/iterator/data>)(C++17) | obtém o ponteiro para o array subjacente
(template de função)