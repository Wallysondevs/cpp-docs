# Tipos de ponto flutuante de largura fixa (desde C++23)

Se a implementação suportar qualquer um dos seguintes tipos [ISO 60559](<https://en.wikipedia.org/wiki/IEEE_754> "enwiki:IEEE 754") como um tipo de ponto flutuante estendido, então:

* a macro correspondente é definida como 1 para indicar suporte,
* o sufixo de [literal de ponto flutuante](<#/doc/language/floating_literal>) correspondente está disponível, e
* o nome do alias de tipo correspondente é fornecido:

**Nome do tipo**  
Definido no header  

```cpp
`<stdfloat>`
bits de armazenamento
std::float16_t
std::float32_t
std::float64_t
std::float128_t
std::bfloat16_t
```

### Notas

O tipo `std::bfloat16_t` é conhecido como [Brain Floating-Point](<https://en.wikipedia.org/wiki/Bfloat16_floating-point_format> "enwiki:Bfloat16 floating-point format").

Ao contrário dos [tipos inteiros de largura fixa](<#/doc/types/integer>), que podem ser aliases para [tipos inteiros padrão](<#/doc/language/types>), os tipos de ponto flutuante de largura fixa devem ser aliases para tipos de ponto flutuante estendidos (não float / double / long double).

### Exemplo

Execute este código
```cpp
    #include <stdfloat>
    
    #if __STDCPP_FLOAT64_T__ != 1
        #error "64-bit float type required"
    #endif
    
    int main()
    {
        std::float64_t f = 0.1f64;
    }
```

### Referências

* Padrão C++23 (ISO/IEC 14882:2024):

* 6.8.3 Optional extended floating-point types [basic.extended.fp]

### Veja também

* [Tipos fundamentais](<#/doc/language/types>)
