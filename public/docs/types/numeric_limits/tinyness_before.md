# std::numeric_limits&lt;T&gt;::tinyness_before

```cpp
static const bool tinyness_before;  // (até C++11)
static constexpr bool tinyness_before;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::tinyness_before é `true` para todos os tipos de ponto flutuante `T` que testam os resultados de expressões de ponto flutuante para underflow antes do arredondamento.

### Especializações padrão

`T` | valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::tinyness_before  
---|---
/* não especializado */ | false  
bool | false  
char | false  
signed char | false  
unsigned char | false  
wchar_t | false  
char8_t (desde C++20) | false  
char16_t (desde C++11) | false  
char32_t (desde C++11) | false  
short | false  
unsigned short | false  
int | false  
unsigned int | false  
long | false  
unsigned long | false  
long long (desde C++11) | false  
unsigned long long (desde C++11) | false  
float | definido pela implementação   
double | definido pela implementação   
long double | definido pela implementação   
  
### Notas

Implementações de ponto flutuante IEEE 754 em conformidade com o padrão são obrigadas a detectar o underflow de ponto flutuante e têm duas situações alternativas onde isso pode ser feito:

  1. Ocorre underflow (e [FE_UNDERFLOW](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado) se um cálculo produzir um resultado cujo valor absoluto, computado como se tanto o intervalo do expoente quanto a precisão fossem ilimitados, for menor que [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::min(). Tal implementação detecta a "tinyness" antes do arredondamento (por exemplo, UltraSparc, POWER).
  2. Ocorre underflow (e [FE_UNDERFLOW](<#/doc/numeric/fenv/FE_exceptions>) pode ser levantado) se, após o arredondamento do resultado para o tipo de ponto flutuante de destino (ou seja, arredondamento para [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::digits bits), o valor absoluto do resultado for menor que [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::min(). Formalmente, o valor absoluto de um resultado não nulo computado como se o intervalo do expoente fosse ilimitado é menor que [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::min(). Tal implementação detecta a "tinyness" após o arredondamento (por exemplo, SuperSparc).

### Exemplo

A multiplicação do maior número subnormal pelo número um epsilon de máquina maior que 1.0 resulta no valor "tiny" 0x0.fffffffffffff8p-1022 antes do arredondamento, mas no valor normal 1p-1022 após o arredondamento. A implementação usada para executar este teste ([IBM Power7](<https://en.wikipedia.org/wiki/IBM_Power_microprocessors#POWER7> "enwiki:IBM Power microprocessors")) detecta a "tinyness" antes do arredondamento.

Execute este código
```cpp
    #include <iostream>
    #include <limits>
    #include <cmath>
    #include <cfenv>
    
    int main()
    {
        std::cout << "Tinyness before: " << std::boolalpha
                  << std::numeric_limits<double>::tinyness_before << '\n';
    
        double denorm_max = std::nextafter(std::numeric_limits<double>::min(), 0);
        double multiplier = 1 + std::numeric_limits<double>::epsilon();
    
        std::feclearexcept(FE_ALL_EXCEPT);
    
        double result = denorm_max * multiplier; // Underflow only if tinyness_before
    
        if (std::fetestexcept(FE_UNDERFLOW))
            std::cout << "Underflow detected\n";
    
        std::cout << std::hexfloat << denorm_max << " x " << multiplier  <<  " = "
                  << result << '\n';
    }
```

Saída possível:
```
    Tinyness before: true
    Underflow detected
    0xf.ffffffffffffp-1030 x 0x1.0000000000001p+0 = 0x1p-1022
```

### Veja também

[ has_denorm_loss](<#/doc/types/numeric_limits/has_denorm_loss>)[static] | identifica os tipos de ponto flutuante que detectam perda de precisão como perda por desnormalização em vez de resultado inexato   
(constante membro estática pública)  
[ has_denorm](<#/doc/types/numeric_limits/has_denorm>)[static] | identifica o estilo de desnormalização usado pelo tipo de ponto flutuante   
(constante membro estática pública)