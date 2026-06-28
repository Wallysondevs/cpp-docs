# std::ranges::ssize

Definido no cabeçalho `[<ranges>](<#/doc/header/ranges>)`

```c
Definido no cabeçalho `<iterator>`
inline namespace /* unspecified */ {
inline constexpr /* unspecified */ ssize = /* unspecified */;
}
(objeto de ponto de customização)
Assinatura da chamada
template< class T >
requires /* see below */
constexpr auto ssize( T&& t );
```

Calcula o número de elementos em t em tempo constante e converte o resultado para um tipo com sinal.

Dada a [subexpressão](<#/doc/language/expressions>) da qual t denota o objeto de resultado (possivelmente [materializado](<#/doc/language/implicit_cast>)) como E:

  * Se [ranges::size](<#/doc/ranges/size>)(t) for malformado, ranges::ssize(E) também é malformado.
  * Caso contrário, seja `Signed` `_[make-signed-like-t](<#/doc/ranges>)_` ﻿<decltype([ranges::size](<#/doc/ranges/size>)(t))>:
    * Se [std::ptrdiff_t](<#/doc/types/ptrdiff_t>) for mais largo que `Signed`, ranges::ssize(E) é [expressão-equivalente](<#/doc/language/expressions>) a static_cast<[std::ptrdiff_t](<#/doc/types/ptrdiff_t>)>([ranges::size](<#/doc/ranges/size>)(t)).
    * Caso contrário, ranges::ssize(E) é expressão-equivalente a static_cast<Signed>([ranges::size](<#/doc/ranges/size>)(t)).

### Objetos de ponto de customização

O nome `ranges::ssize` denota um _objeto de ponto de customização_, que é um [function object](<#/doc/named_req/FunctionObject>) const de um tipo de classe [literal](<#/doc/named_req/LiteralType>) [`semiregular`](<#/doc/concepts/semiregular>). Para fins de exposição, a versão cv-não qualificada de seu tipo é denotada como `___ssize_fn_`.

Todas as instâncias de `___ssize_fn_` são iguais. Os efeitos de invocar diferentes instâncias do tipo `___ssize_fn_` com os mesmos argumentos são equivalentes, independentemente de a expressão que denota a instância ser um lvalue ou rvalue, e ser const-qualificada ou não (no entanto, uma instância volatile-qualificada não é exigida para ser invocável). Assim, `ranges::ssize` pode ser copiado livremente e suas cópias podem ser usadas de forma intercambiável.

Dado um conjunto de tipos `Args...`, se [std::declval](<#/doc/utility/declval>)&lt;Args&gt;()... atenderem aos requisitos para argumentos de `ranges::ssize` acima, `___ssize_fn_` modela

  * [std::invocable](<#/doc/concepts/invocable>)<__ssize_fn, Args...>,
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __ssize_fn, Args...&gt;,
  * [std::invocable](<#/doc/concepts/invocable>)<__ssize_fn&, Args...>, e
  * [std::invocable](<#/doc/concepts/invocable>)&lt;const __ssize_fn&, Args...&gt;.

Caso contrário, nenhum operador de chamada de função de `___ssize_fn_` participa da resolução de sobrecarga.

### Notas

Se ranges::ssize(e) for válido para uma expressão e, o tipo de retorno é um [tipo inteiro com sinal](<#/doc/iterator/is-integer-like>).

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <ranges>
    #include <type_traits>
    
    int main()
    {
        std::array arr{1, 2, 3, 4, 5};
        auto s = std::ranges::ssize(arr);
    
        std::cout << "ranges::ssize(arr) = " << s << '\n'
                  << "ranges::ssize is "
                  << (std::is_signed_v<decltype(s)> ? "signed" : "unsigned")
                  << '\n';
    
        std::cout << "reversed arr: ";
    
        for (--s; s >= 0; --s)
            std::cout << arr[s] << ' ';
    
        std::cout << "\n" "s = " << s << '\n';
    }
```

Saída:
```
    ranges::ssize(arr) = 5
    ranges::ssize is signed
    reversed arr: 5 4 3 2 1
    s = -1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3403](<https://cplusplus.github.io/LWG/issue3403>) | C++20 | `ranges::size` funcionava para alguns tipos não-range, mas `ranges::ssize` não | feito funcionar

### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) | retorna um inteiro igual ao tamanho de um range
(objeto de ponto de customização)
[ ranges::sized_range](<#/doc/ranges/sized_range>)(C++20) | especifica que um range conhece seu tamanho em tempo constante
(concept)
[ ranges::distance](<#/doc/iterator/ranges/distance>)(C++20) | retorna a distância entre um iterator e um sentinel, ou entre o início e o fim de um range
(objeto de função de algoritmo)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(function template)