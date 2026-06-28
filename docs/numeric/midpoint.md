# std::midpoint

Definido no cabeçalho `[<numeric>](<#/doc/header/numeric>)`

```c
template< class T >
constexpr T midpoint( T a, T b ) noexcept;
template< class T >
constexpr T* midpoint( T* a, T* b );
```

Calcula o ponto médio de inteiros, números de ponto flutuante ou ponteiros a e b.

1) Esta sobrecarga participa da resolução de sobrecarga somente se `T` for um tipo aritmético diferente de bool.

2) Esta sobrecarga participa da resolução de sobrecarga somente se `T` for um tipo de objeto. O uso desta sobrecarga é malformado se `T` for um [tipo incompleto](<#/doc/language/type-id>).

### Parâmetros

- **a, b** — inteiros, números de ponto flutuante ou valores de ponteiro

### Valor de retorno

1) Metade da soma de a e b. Nenhum overflow ocorre. Se a e b tiverem tipo inteiro e a soma for ímpar, o resultado é arredondado na direção de a. Se a e b tiverem tipo de ponto flutuante, ocorre no máximo uma operação inexata.

2) Se a e b apontam, respectivamente, para x[i] e x[j] do mesmo objeto array `x` (para fins de [aritmética de ponteiros](<#/doc/language/operator_arithmetic>)), retorna um ponteiro para x[i + (j - i) / 2] (ou, equivalentemente, x[std::midpoint(i, j)]) onde a divisão arredonda para zero. Se a e b não apontam para elementos do mesmo objeto array, o comportamento é indefinido.

### Exceções

Não lança exceções.

### Notas

A sobrecarga (2) pode ser simplesmente implementada como `return a + (b - a) / 2;` em plataformas comuns. No entanto, tal implementação não é garantida como portátil, porque pode haver algumas plataformas onde a criação de um array com um número de elementos maior que [PTRDIFF_MAX](<#/doc/types/climits>) é possível, e `b - a` pode resultar em comportamento indefinido mesmo que ambos b e a apontem para elementos no mesmo array.

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_interpolate`](<#/doc/feature_test>) | [`201902L`](<#/>) | (C++20) | [std::lerp](<#/doc/numeric/lerp>), `std::midpoint`

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <iostream>
    #include <limits>
    #include <numeric>
    
    int main()
    {
        std::uint32_t a = std::numeric_limits<std::uint32_t>::max();
        std::uint32_t b = std::numeric_limits<std::uint32_t>::max() - 2;
    
        std::cout << "a: " << a << '\n'
                  << "b: " << b << '\n'
                  << "Incorrect (overflow and wrapping): " << (a + b) / 2 << '\n'
                  << "Correct: " << std::midpoint(a, b) << "\n\n";
    
        auto on_pointers = 
        {
            char const* text = "0123456789";
            char const* p = text + i;
            char const* q = text + j;
            std::cout << "std::midpoint('" << *p << "', '" << *q << "'): '"
                      << *std::midpoint(p, q) << "'\n";
        };
    
        on_pointers(2, 4);
        on_pointers(2, 5);
        on_pointers(5, 2);
        on_pointers(2, 6);
    }
```

Saída:
```
    a: 4294967295
    b: 4294967293
    Incorrect (overflow and wrapping): 2147483646
    Correct: 4294967294
    
    std::midpoint('2', '4'): '3'
    std::midpoint('2', '5'): '3'
    std::midpoint('5', '2'): '4'
    std::midpoint('2', '6'): '4'
```

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

  * 27.10.16 Midpoint [numeric.ops.midpoint]

* Padrão C++20 (ISO/IEC 14882:2020):

  * 25.10.15 Midpoint [numeric.ops.midpoint]

### Veja também

[ lerp](<#/doc/numeric/lerp>)(C++20) | função de interpolação linear
(função)