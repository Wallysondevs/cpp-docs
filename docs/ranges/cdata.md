# std::ranges::cdata

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /*unspecified*/ {
inline constexpr /*unspecified*/ cdata = /*unspecified*/;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr /* see below */ cdata( T&& t );
```

Retorna um ponteiro para o primeiro elemento de tipo constante(desde C++23) de um range contíguo denotado por um argumento qualificado como const(até C++23).

Seja `CT`

  * const [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;T&gt;& se o argumento é um lvalue (isto é, `T` é um tipo de referência lvalue),
  * const T caso contrário.

Uma chamada para `ranges::cdata` é [expressão-equivalente](<#/doc/language/expressions>) a [ranges::data](<#/doc/ranges/data>)(static_cast<CT&&>(t)). O tipo de retorno é equivalente a [std::remove_reference_t](<#/doc/types/remove_reference>)<[ranges::range_reference_t](<#/doc/ranges/range_reference_t>)&lt;CT&gt;>*. | (até C++23)
Se o argumento é um lvalue ou [ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>)<[std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;> é verdadeiro, então uma chamada para `ranges::cdata` é [expressão-equivalente](<#/doc/language/expressions>) a:

  * `_[as-const-pointer](<#/doc/ranges>)_`([ranges::data](<#/doc/ranges/data>)(`_[possibly-const-range](<#/doc/ranges>)_`(t))).

O tipo de retorno é equivalente a [std::remove_reference_t](<#/doc/types/remove_reference>)<[ranges::range_const_reference_t](<#/doc/ranges/range_reference_t>)&lt;T&gt;>*. Em todos os outros casos, uma chamada para `ranges::cdata` é malformada, o que pode resultar em [falha de substituição](<#/doc/language/sfinae>) quando a chamada aparece no contexto imediato de uma instanciação de template. | (desde C++23)

Se ranges::cdata(t) é válido, então ele retorna um ponteiro para um objeto de tipo constante(desde C++23).

### Objetos de ponto de customização

O nome `ranges::cdata` denota um _objeto de ponto de customização_, que é um [objeto de função](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão não qualificada por cv de seu tipo é denotada como `___cdata_fn_`.

Todas as instâncias de `___cdata_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___cdata_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser qualificada como const ou não (no entanto, uma instância qualificada como volatile não é exigida para ser invocável). Assim, `ranges::cdata` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atendem aos requisitos para argumentos de `ranges::cdata` acima, `___cdata_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__cdata_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __cdata_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__cdata_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __cdata_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___cdata_fn_` participa da resolução de sobrecarga.

### Exemplo

Execute este código
```cpp
    #include <cstring>
    #include <iostream>
    #include <ranges>
    #include <string>
    
    int main()
    {
        std::string src {"hello world!\n"};
    
    //  std::ranges::cdata(src)[0] = 'H'; // erro, src.data() é tratado como somente leitura
        std::ranges::data(src)[0] = 'H'; // OK, src.data() é um armazenamento não-const
    
        char dst[20]; // armazenamento para uma string estilo C
        std::strcpy(dst, std::ranges::cdata(src));
        // [data(src), data(src) + size(src)] is guaranteed to be an NTBS
    
        std::cout << dst;
    }
```

Saída:
```
    Hello world!
```

### Veja também

[ ranges::data](<#/doc/ranges/data>)(C++20) | obtém um ponteiro para o início de um range contíguo
(objeto de ponto de customização)
[ data](<#/doc/iterator/data>)(C++17) | obtém o ponteiro para o array subjacente
(modelo de função)