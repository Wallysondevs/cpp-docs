# std::fegetround, std::fesetround

Definido no header `[<cfenv>](<#/doc/header/cfenv>)`

```cpp
int fesetround( int round )  // (1) (desde C++11)
int fegetround()  // (2) (desde C++11)
```

Gerencia a direção de arredondamento de ponto flutuante.

1) Tenta estabelecer a direção de arredondamento de ponto flutuante igual ao argumento `round`, que se espera ser uma das [macros de arredondamento de ponto flutuante](<#/doc/numeric/fenv/FE_round>).

2) Retorna o valor da [macro de arredondamento de ponto flutuante](<#/doc/numeric/fenv/FE_round>) que corresponde à direção de arredondamento atual.

### Parâmetros

- **round** — direção de arredondamento, uma das [macros de arredondamento de ponto flutuante](<#/doc/numeric/fenv/FE_round>)

### Valor de retorno

1) ​0​ em caso de sucesso, diferente de zero caso contrário.

2) A [macro de arredondamento de ponto flutuante](<#/doc/numeric/fenv/FE_round>) que descreve a direção de arredondamento atual ou um valor negativo se a direção não puder ser determinada.

### Notas

O modo de arredondamento atual, refletindo os efeitos do `fesetround` mais recente, também pode ser consultado com [FLT_ROUNDS](<#/doc/types/climits/FLT_ROUNDS>).

Veja [macros de arredondamento de ponto flutuante](<#/doc/numeric/fenv/FE_round>) para os efeitos do arredondamento.

### Exemplo

Execute este código
```cpp
    #include <cfenv>
    #include <cmath>
    #include <iomanip>
    #include <iostream>
    #include <utility>
    // #pragma STDC FENV_ACCESS ON
    
    int main()
    {
        static constexpr std::pair<const char*, const double> samples[]
        {
            {" 12.0", 12.0},  {" 12.1", 12.1}, {"-12.1", -12.1}, {" 12.5", 12.5},
            {"-12.5", -12.5}, {" 12.9", 12.9}, {"-12.9", -12.9}, {" 13.0", 13.0}
        };
    
        std::cout <<
            "│ sample │  FE_DOWNWARD  │   FE_UPWARD   │ FE_TONEAREST  │ FE_TOWARDZERO │\n";
    
        for (const auto& [str, fp] : samples)
        {
            std::cout << "│ " << std::setw(6) << str << " │  ";
            for (const int dir : {FE_DOWNWARD, FE_UPWARD, FE_TONEAREST, FE_TOWARDZERO})
            {
                std::fesetround(dir);
                std::cout << std::setw(10) << std::fixed << std::nearbyint(fp) << "   │  ";
            }
            std::cout << '\n';
        }
    }
```

Output:
```
    │ sample │  FE_DOWNWARD  │   FE_UPWARD   │ FE_TONEAREST  │ FE_TOWARDZERO │
    │   12.0 │   12.000000   │   12.000000   │   12.000000   │   12.000000   │
    │   12.1 │   12.000000   │   13.000000   │   12.000000   │   12.000000   │
    │  -12.1 │  -13.000000   │  -12.000000   │  -12.000000   │  -12.000000   │
    │   12.5 │   12.000000   │   13.000000   │   12.000000   │   12.000000   │
    │  -12.5 │  -13.000000   │  -12.000000   │  -12.000000   │  -12.000000   │
    │   12.9 │   12.000000   │   13.000000   │   13.000000   │   12.000000   │
    │  -12.9 │  -13.000000   │  -12.000000   │  -13.000000   │  -12.000000   │
    │   13.0 │   13.000000   │   13.000000   │   13.000000   │   13.000000   │
```

### Veja também

[ nearbyintnearbyintfnearbyintl](<#/doc/numeric/math/nearbyint>)(C++11)(C++11)(C++11) | inteiro mais próximo usando o modo de arredondamento atual
(function)
[ rintrintfrintllrintlrintflrintlllrintllrintfllrintl](<#/doc/numeric/math/rint>)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11)(C++11) | inteiro mais próximo usando o modo de arredondamento atual com exceção se o resultado diferir
(function)
[Documentação C](<#/>) para fegetround, fesetround