# std::signed_integral

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept signed_integral = std::integral<T> && std::is_signed_v<T>;
```

O concept `signed_integral<T>` é satisfeito se e somente se `T` for um tipo integral e [std::is_signed_v](<#/doc/types/is_signed>)&lt;T&gt; for true.

### Observações

`signed_integral<T>` pode ser satisfeito por um tipo que não é um [tipo inteiro com sinal](<#/doc/language/type-id>), por exemplo, char (em um sistema onde char é com sinal).

### Exemplo

Execute este código
```cpp
    #include <concepts>
    #include <iostream>
    #include <string_view>
    
    void test(std::signed_integral auto x, std::string_view text = "")
    {
        std::cout << text << " (" + (text == "") << x << ") is a signed integral\n";
    }
    
    void test(std::unsigned_integral auto x, std::string_view text = "")
    {
        std::cout << text << " (" + (text == "") << x << ") is an unsigned integral\n";
    }
    
    void test(auto x, std::string_view text = "")
    {
        std::cout << text << " (" + (text == "") << x << ") is non-integral\n";
    }
    
    int main()
    {
        test(42);               // signed
        test(0xFULL, "0xFULL"); // unsigned
        test('A');              // platform-dependent
        test(true, "true");     // unsigned
        test(4e-2, "4e-2");     // non-integral (hex-float)
        test("∫∫");             // non-integral
    }
```

Saída possível:
```
    (42) is a signed integral
    0xFULL (15) is an unsigned integral
    (A) is a signed integral
    true (1) is an unsigned integral
    4e-2 (0.04) is non-integral
    (∫∫) is non-integral
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.4.7 Arithmetic concepts [concepts.arithmetic]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.4.7 Arithmetic concepts [concepts.arithmetic]

### Veja também

[ is_integral](<#/doc/types/is_integral>)(C++11) | verifica se um tipo é um tipo integral
(class template)
[ is_signed](<#/doc/types/is_signed>)(C++11) | verifica se um tipo é um tipo aritmético com sinal
(class template)