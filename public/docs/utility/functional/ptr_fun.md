# std::ptr_fun

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class Arg, class Result >
std::pointer_to_unary_function<Arg,Result>
ptr_fun( Result (*f)(Arg) );
(removido em C++17)
template< class Arg1, class Arg2, class Result >
std::pointer_to_binary_function<Arg1,Arg2,Result>
ptr_fun( Result (*f)(Arg1, Arg2) );
(removido em C++17)
```

Cria um objeto wrapper de função (ou [std::pointer_to_unary_function](<#/doc/utility/functional/pointer_to_unary_function>) ou [std::pointer_to_binary_function](<#/doc/utility/functional/pointer_to_binary_function>)), deduzindo o tipo alvo a partir dos argumentos do template.

1) Efetivamente chama [std::pointer_to_unary_function](<#/doc/utility/functional/pointer_to_unary_function>)<Arg,Result>(f).

2) Efetivamente chama [std::pointer_to_binary_function](<#/doc/utility/functional/pointer_to_binary_function>)<Arg1,Arg2,Result>(f).

Esta função e os tipos relacionados são obsoletos desde C++11 em favor dos mais gerais [std::function](<#/doc/utility/functional/function>) e [std::ref](<#/doc/utility/functional/ref>), ambos os quais criam objetos de função compatíveis com adaptadores chamáveis a partir de funções simples.

### Parâmetros

- **f** — ponteiro para uma função para a qual criar um wrapper

### Valor de retorno

Um objeto de função que encapsula f.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <string_view>
    
    constexpr bool is_vowel(char c)
    {
        return std::string_view{"aeoiuAEIOU"}.find(c) != std::string_view::npos;
    }
    
    int main()
    {
        std::string_view s = "Hello, world!";
        std::ranges::copy_if(s, std::ostreambuf_iterator<char>(std::cout),
            std::not1(std::ptr_fun(is_vowel)));
    #if 0
    // C++11 alternatives:
            std::not1(std::cref(is_vowel)));
            std::not1(std::function<bool(char)>(is_vowel)));
             { return !is_vowel(c); });
    // C++17 alternatives:
            std::not_fn(is_vowel));
    #endif
    }
```

Saída:
```
    Hll, wrld!
```

### Veja também

[ function](<#/doc/utility/functional/function>)(C++11) | wrapper copiável de qualquer objeto chamável copiável
(class template)
[ move_only_function](<#/doc/utility/functional/move_only_function>)(C++23) | wrapper move-only de qualquer objeto chamável que suporte qualificadores em uma dada assinatura de chamada
(class template)
[ invokeinvoke_r](<#/doc/utility/functional/invoke>)(C++17)(C++23) | invoca qualquer objeto [Callable](<#/doc/named_req/Callable>) com os argumentos fornecidos e possibilidade de especificar o tipo de retorno (desde C++23)
(function template)
[ not_fn](<#/doc/utility/functional/not_fn>)(C++17) | cria um objeto de função que retorna o complemento do resultado do objeto de função que ele contém
(function template)