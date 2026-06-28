# std::numeric_limits&lt;T&gt;::round_style

```cpp
static const std::float_round_style round_style;  // (até C++11)
static constexpr std::float_round_style round_style;  // (desde C++11)
```

  
O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::round_style identifica o estilo de arredondamento usado pelo tipo de ponto flutuante `T` sempre que um valor que não é um dos valores exatamente representáveis de `T` é armazenado em um objeto desse tipo.

### Especializações padrão

`T` |  valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::round_style  
---|---
/* non-specialized */ |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
bool |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
char |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
signed char |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
unsigned char |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
wchar_t |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
char8_t (desde C++20) |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
char16_t (desde C++11) |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
char32_t (desde C++11) |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
short |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
unsigned short |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
int |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
unsigned int |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
long |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
unsigned long |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
long long (desde C++11) |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
unsigned long long (desde C++11) |  [std::round_toward_zero](<#/doc/types/numeric_limits/float_round_style>)  
float |  geralmente [std::round_to_nearest](<#/doc/types/numeric_limits/float_round_style>)  
double |  geralmente [std::round_to_nearest](<#/doc/types/numeric_limits/float_round_style>)  
long double |  geralmente [std::round_to_nearest](<#/doc/types/numeric_limits/float_round_style>)  
  
### Notas

Esses valores são constantes e não refletem as alterações no arredondamento feitas por [std::fesetround](<#/doc/numeric/fenv/feround>). Os valores alterados podem ser obtidos de [FLT_ROUNDS](<#/doc/types/climits/FLT_ROUNDS>) ou [std::fegetround](<#/doc/numeric/fenv/feround>). 

### Exemplo

O valor decimal 0.1 não pode ser representado por um tipo de ponto flutuante binário. Quando armazenado em um double IEEE-754, ele fica entre 0x1.9999999999999*2-4  
e 0x1.999999999999a*2-4  
. O arredondamento para o valor representável mais próximo resulta em 0x1.999999999999a*2-4  
. 

Similarmente, o valor decimal 0.3, que está entre 0x1.3333333333333*2-2  
e 0x1.3333333333334*2-2  
, é arredondado para o mais próximo e é armazenado como 0x1.3333333333333*2-2  
. 

Execute este código
```cpp
    #include <iostream>
    #include <limits>
     
    auto print(std::float_round_style frs)
    {
        switch (frs)
        {
            case std::round_indeterminate:
                return "O estilo de arredondamento não pode ser determinado";
            case std::round_toward_zero:
                return "Arredondamento em direção a zero";
            case std::round_to_nearest:
                return "Arredondamento em direção ao valor representável mais próximo";
            case std::round_toward_infinity:
                return "Arredondamento em direção ao infinito positivo";
            case std::round_toward_neg_infinity:
                return "Arredondamento em direção ao infinito negativo";
        }
        return "estilo de arredondamento desconhecido";
    }
     
    int main()
    {
        std::cout << std::hexfloat
                  << "O decimal 0.1 é armazenado em um double como "
                  << 0.1 << '\n'
                  << "O decimal 0.3 é armazenado em um double como "
                  << 0.3 << '\n'
                  << print(std::numeric_limits<double>::round_style) << '\n';
    }
```

Saída: 
```
    O decimal 0.1 é armazenado em um double como 0x1.999999999999ap-4
    O decimal 0.3 é armazenado em um double como 0x1.3333333333333p-2
    Arredondamento em direção ao valor representável mais próximo
```

### Veja também

[ float_round_style](<#/doc/types/numeric_limits/float_round_style>) |  indica modos de arredondamento de ponto flutuante   
(enum)  