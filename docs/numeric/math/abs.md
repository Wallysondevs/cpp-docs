# std::abs, std::labs, std::llabs, std::imaxabs

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
Definido no cabeçalho `<cmath>`
int abs( int num );
long abs( long num );
long long abs( long long num );
(constexpr desde C++23)
Definido no cabeçalho `<cstdlib>`
long labs( long num );
long long llabs( long long num );
(constexpr desde C++23)
Definido no cabeçalho `<cinttypes>`
std::intmax_t abs( std::intmax_t num );
(constexpr desde C++23)
std::intmax_t imaxabs( std::intmax_t num );
(constexpr desde C++23)
```

Calcula o valor absoluto do número inteiro num. O comportamento é indefinido se o resultado não puder ser representado pelo tipo de retorno.

Se `std::abs` for chamado com um argumento integral sem sinal que não pode ser convertido para int por [promoção integral](<#/doc/language/implicit_cast>), o programa é malformado.

A sobrecarga (6) de `std::abs` para [std::intmax_t](<#/doc/types/integer>) é fornecida em [`<cinttypes>`](<#/doc/header/cinttypes>) se e somente se [std::intmax_t](<#/doc/types/integer>) for um [tipo inteiro estendido](<#/doc/language/types>). | (desde C++11)

### Parâmetros

- **num** — valor inteiro

### Valor de retorno

O valor absoluto de num (isto é, `|num|`), se for representável.

### Notas

Em sistemas de [complemento de 2](<#/doc/language/types>), o valor absoluto do valor mais negativo está fora do intervalo, por exemplo, para o tipo int de 32 bits em complemento de 2, [INT_MIN](<#/doc/types/climits>) é -2147483648, mas o resultado esperado 2147483648 é maior que [INT_MAX](<#/doc/types/climits>), que é 2147483647.

### Exemplo

Execute este código
```cpp
    #include <climits>
    #include <cstdlib>
    #include <iostream>
    
    int main()
    {
        std::cout << std::showpos
                  << "abs(+3) = " << std::abs(3) << '\n'
                  << "abs(-3) = " << std::abs(-3) << '\n';
    
    //  std::cout << std::abs(INT_MIN); // undefined behavior on 2's complement systems
    }
```

Saída:
```
    abs(+3) = +3
    abs(-3) = +3
```

### Relatórios de Defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 2192](<https://cplusplus.github.io/LWG/issue2192>) | C++98 | sobrecargas de `std::abs` foram
declaradas inconsistentemente em dois cabeçalhos | declarou essas sobrecargas
em ambos os cabeçalhos

### Veja também

[ abs(float)fabsfabsffabsl](<#/doc/numeric/math/fabs>)(C++11)(C++11) | valor absoluto de um valor de ponto flutuante (\\(\small{|x|}\\)|x|)
(função)
[ abs(std::complex)](<#/doc/numeric/complex/abs>) | retorna a magnitude de um número complexo
(modelo de função)
[ abs(std::valarray)](<#/doc/numeric/valarray/abs>) | aplica a função abs a cada elemento de valarray
(modelo de função)
[Documentação C](<#/>) para abs, labs, llabs