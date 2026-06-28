# std::numeric_limits&lt;T&gt;::is_modulo

```cpp
static const bool is_modulo;  // (até C++11)
static constexpr bool is_modulo;  // (desde C++11)
```

O valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_modulo é `true` para todos os tipos aritméticos `T` que lidam com overflows usando aritmética modular, ou seja, se o resultado de uma adição, subtração, multiplicação ou divisão deste tipo cairia fora do intervalo `[`[min()](<#/doc/types/numeric_limits/min>)`, `[max()](<#/doc/types/numeric_limits/max>)`]`, o valor retornado por tal operação difere do valor esperado por um múltiplo de `max() - min() + 1`.

`is_modulo` é `false` para tipos inteiros com sinal, a menos que a implementação defina que o overflow de inteiros com sinal deve circular (wrap).

### Especializações padrão

`T` | valor de [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::is_modulo
---|---
/* não especializado */ | false
bool | false
char | definido pela implementação
signed char | definido pela implementação
unsigned char | true
wchar_t | definido pela implementação
char8_t (desde C++20) | true
char16_t (desde C++11) | true
char32_t (desde C++11) | true
short | definido pela implementação
unsigned short | true
int | definido pela implementação
unsigned int | true
long | definido pela implementação
unsigned long | true
long long (C++11) | definido pela implementação
unsigned long long (C++11) | true
float | false
double | false
long double | false

### Notas

O padrão dizia "Na maioria das máquinas, isso é verdadeiro para inteiros com sinal." antes da resolução do [LWG issue 2422](<https://cplusplus.github.io/LWG/issue2422>). Veja [GCC PR 22200](<http://gcc.gnu.org/bugzilla/show_bug.cgi?id=22200>) para uma discussão relacionada.

### Exemplo

Demonstra o comportamento de tipos modulares:

Run this code
```
    #include <iostream>
    #include <type_traits>
    #include <limits>
     
    template<class T>
    typename std::enable_if<std::numeric_limits<T>::is_modulo>::type
        check_overflow()
    {
        std::cout << "max value is " << std::numeric_limits<T>::max() << '\n'
                  << "min value is " << std::numeric_limits<T>::min() << '\n'
                  << "max value + 1 is " << std::numeric_limits<T>::max()+1 << '\n';
    }
     
    int main()
    {
        check_overflow<int>();
        std::cout << '\n';
        check_overflow<unsigned long>();
    //  check_overflow<float>(); // compile-time error, not a modulo type
    }
```

Saída possível:
```
    max value is 2147483647
    min value is -2147483648
    max value + 1 is -2147483648
     
    max value is 18446744073709551615
    min value is 0
    max value + 1 is 0
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 612](<https://cplusplus.github.io/LWG/issue612>) | C++98 | a definição de "lidar com overflows usando aritmética modular" era deficiente[1](<#/doc/types/numeric_limits/is_modulo>) | forneceu uma definição melhor
[LWG 2422](<https://cplusplus.github.io/LWG/issue2422>) | C++98 | `is_modulo` era exigido como `true` para tipos inteiros com sinal na maioria das máquinas | exigido como `false` para tipos inteiros com sinal, a menos que o overflow de inteiros com sinal seja definido para circular

1. [↑](<#/doc/types/numeric_limits/is_modulo>) A definição é "adicionar dois números positivos pode ter um resultado que circula para um terceiro número que é menor". Ela apresenta os seguintes problemas:
    * Não define o valor circulado.
    * Não declara se o resultado é repetível.
    * Não exige que a adição, subtração e outras operações em todos os valores tenham comportamento definido.

### Veja também

[ is_integer](<#/doc/types/numeric_limits/is_integer>)[static] | identifica tipos inteiros
(membro constante estático público)
[ is_iec559](<#/doc/types/numeric_limits/is_iec559>)[static] | identifica os tipos de ponto flutuante IEC 559/IEEE 754
(membro constante estático público)
[ is_exact](<#/doc/types/numeric_limits/is_exact>)[static] | identifica tipos exatos
(membro constante estático público)