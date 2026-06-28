# Operadores aritméticos

Retorna o resultado de uma operação aritmética específica.

Nome do operador | Sintaxe | Exemplos de protótipo (para a classe T)
---|---|---|---
Dentro da definição da classe | Fora da definição da classe
Mais unário | +a | T T::operator+() const; | T operator+(const T& a);
Menos unário | -a | T T::operator-() const; | T operator-(const T& a);
Adição | a + b | T T::operator+(const T2& b) const; | T operator+(const T& a, const T2& b);
Subtração | a - b | T T::operator-(const T2& b) const; | T operator-(const T& a, const T2& b);
Multiplicação | a * b | T T::operator*(const T2& b) const; | T operator*(const T& a, const T2& b);
Divisão | a / b | T T::operator/(const T2& b) const; | T operator/(const T& a, const T2& b);
Resto | a % b | T T::operator%(const T2& b) const; | T operator%(const T& a, const T2& b);
NOT bit a bit | ~a | T T::operator~() const; | T operator~(const T& a);
AND bit a bit | a & b | T T::operator&(const T2& b) const; | T operator&(const T& a, const T2& b);
OR bit a bit | a | b | T T::operator|(const T2& b) const; | T operator|(const T& a, const T2& b);
XOR bit a bit | a ^ b | T T::operator^(const T2& b) const; | T operator^(const T& a, const T2& b);
Deslocamento à esquerda bit a bit | a << b | T T::operator<<(const T2& b) const; | T operator<<(const T& a, const T2& b);
Deslocamento à direita bit a bit | a >> b | T T::operator>>(const T2& b) const; | T operator>>(const T& a, const T2& b);

**Notas**

*   Todos os operadores nesta tabela são [sobrecarregáveis](<#/doc/language/operators>).
*   Todos os operadores embutidos retornam valores, e a maioria das [sobrecargas definidas pelo usuário](<#/doc/language/operators>) também retorna valores para que os operadores definidos pelo usuário possam ser usados da mesma maneira que os embutidos. No entanto, em uma sobrecarga de operador definida pelo usuário, qualquer tipo pode ser usado como tipo de retorno (incluindo void). Em particular, as sobrecargas de inserção e extração de stream dos operadores operator<< e operator>> retornam `T&`.
*   `T2` pode ser qualquer tipo, incluindo `T`.

### Explicação geral

Todos os operadores aritméticos embutidos calculam o resultado de uma operação aritmética específica e retornam seu resultado. Os argumentos não são modificados.

#### Conversões

Se o operando passado para um operador aritmético embutido for de tipo integral ou de enumeração não escopada, então, antes de qualquer outra ação (mas após a conversão lvalue-para-rvalue, se aplicável), o operando passa por [promoção integral](<#/doc/language/implicit_cast>). Se um operando tiver tipo array ou função, as conversões [array-para-ponteiro](<#/doc/language/implicit_cast>) e [função-para-ponteiro](<#/doc/language/implicit_cast>) são aplicadas.

Para os operadores binários (exceto deslocamentos), se os operandos promovidos tiverem tipos diferentes, as [conversões aritméticas usuais](<#/doc/language/usual_arithmetic_conversions>) são aplicadas.

#### Estouro (Overflows)

A aritmética de inteiros sem sinal é sempre realizada módulo 2n, onde n é o número de bits nesse inteiro particular. Por exemplo, para unsigned int, adicionar um a [UINT_MAX](<#/doc/types/climits>) resulta em ​0​, e subtrair um de ​0​ resulta em [UINT_MAX](<#/doc/types/climits>).

Quando uma operação aritmética de inteiro com sinal estoura (o resultado não cabe no tipo de resultado), o comportamento é indefinido — as possíveis manifestações de tal operação incluem:

*   ele 'envolve' (wraps around) de acordo com as regras da representação (tipicamente [complemento de dois](<#/doc/language/types>)),
*   ele 'trava' (traps) — em algumas plataformas ou devido a opções do compilador (por exemplo, `-ftrapv` no GCC e Clang),
*   ele satura para o valor mínimo ou máximo (em muitos DSPs),
*   ele é completamente [otimizado pelo compilador](<https://blog.llvm.org/2011/05/what-every-c-programmer-should-know_14.html>).

#### Ambiente de ponto flutuante

Se [` #pragma STDC FENV_ACCESS`](<#/doc/preprocessor/impl>) for suportado e definido como `ON`, todos os operadores aritméticos de ponto flutuante obedecem à [direção de arredondamento](<#/doc/numeric/fenv/FE_round>) de ponto flutuante atual e reportam erros aritméticos de ponto flutuante conforme especificado em [`math_errhandling`](<#/doc/numeric/math/math_errhandling>), a menos que façam parte de um [inicializador estático](<#/doc/language/initialization>) (nesse caso, exceções de ponto flutuante não são levantadas e o modo de arredondamento é para o mais próximo).

#### Contração de ponto flutuante

A menos que [` #pragma STDC FP_CONTRACT`](<#/doc/preprocessor/impl>) seja suportado e definido como `OFF`, toda a aritmética de ponto flutuante pode ser realizada como se os resultados intermediários tivessem alcance e precisão infinitos, ou seja, otimizações que omitem erros de arredondamento e exceções de ponto flutuante são permitidas. Por exemplo, C++ permite a implementação de (x * y) + z com uma única instrução de CPU de multiplicação-adição fundida ou a otimização de a = x * x * x * x; como tmp = x * x; a = tmp * tmp.

Não relacionado à contração, os resultados intermediários da aritmética de ponto flutuante podem ter um alcance e precisão diferentes dos indicados por seu tipo, veja [FLT_EVAL_METHOD](<#/doc/types/climits/FLT_EVAL_METHOD>).

Formalmente, o padrão C++ não oferece garantia sobre a precisão das operações de ponto flutuante.

### Operadores aritméticos unários

As expressões de operadores aritméticos unários têm a forma

---
`+` expression | (1) |
---|---|---
`-` expression | (2) |

1) Mais unário (promoção).

2) Menos unário (negação).

Os operadores unários `+` e `-` têm [precedência](<#/doc/language/operator_precedence>) maior do que todos os operadores aritméticos binários, portanto, a expressão não pode conter operadores aritméticos binários de nível superior. Esses operadores associam da direita para a esquerda:
```cpp
    +a - b; // equivalente a (+a) - b, NÃO +(a - b)
    -c + d; // equivalente a (-c) + d, NÃO -(c + d)
    
    +-e; // equivalente a +(-e), o + unário é uma no-op se “e” for um tipo embutido
         // porque qualquer promoção possível já é realizada durante a negação
```

#### Operadores aritméticos unários embutidos

1) Para o operador mais unário embutido, a expressão deve ser um prvalue de tipo aritmético, de enumeração não escopada ou de ponteiro. A promoção integral é realizada na expressão se ela tiver tipo integral ou de enumeração não escopada. O tipo do resultado é o tipo (possivelmente promovido) da expressão.

O resultado da promoção embutida é o valor da expressão. A operação unária embutida é uma no-op se o operando for um prvalue de um tipo integral promovido ou um tipo de ponteiro. Caso contrário, o tipo ou a categoria de valor do operando é alterado por promoção integral ou conversão lvalue-para-rvalue, array-para-ponteiro, função-para-ponteiro ou definida pelo usuário. Por exemplo, char é convertido para int, e uma [expressão lambda](<#/doc/language/lambda>) sem captura não genérica é convertida para ponteiro de função (desde C++11) em expressões de mais unário.

2) Para o operador menos unário embutido, a expressão deve ser um prvalue de tipo aritmético ou de enumeração não escopada. A promoção integral é realizada na expressão. O tipo do resultado é o tipo do tipo promovido da expressão.

O resultado da negação embutida é o negativo da expressão promovida. Para um `a` sem sinal, o valor de -a é \\({\small 2^N-a}\\)2N
-a, onde N é o número de bits após a promoção.

*   Em outras palavras, o resultado é o complemento de dois do operando (onde operando e resultado são considerados sem sinal).

#### Sobrecargas

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada tipo aritmético promovido não cv-qualificado `A` e para cada tipo `T`, as seguintes assinaturas de função participam da resolução de sobrecarga:

A operator+(A)
---|---|
T* operator+(T*)
A operator-(A)

Execute este código
```cpp
    #include <iostream>
    
    int main()
    {
        char c = 0x6a;
        int n1 = 1;
        unsigned char n2 = 1;
        unsigned int n3 = 1;
        std::cout << "char: " << c << " int: " << +c << "\n"
                     "-1, onde 1 é com sinal: " << -n1 << "\n"
                     "-1, onde 1 é unsigned char: " << -n2 << "\n"
                     "-1, onde 1 é unsigned int: " << -n3 << '\n';
        char a[3];
        std::cout << "tamanho do array: " << sizeof a << "\n"
                     "tamanho do ponteiro: " << sizeof +a << '\n';
    }
```

Saída possível:
```
    char: j int: 106
    -1, onde 1 é com sinal: -1
    -1, onde 1 é unsigned char: -1
    -1, onde 1 é unsigned int: 4294967295
    tamanho do array: 3
    tamanho do ponteiro: 8
```

### Operadores aditivos

As expressões de operadores aditivos têm a forma

---
lhs `+` rhs | (1) |
---|---|---
lhs `-` rhs | (2) |

1) Mais binário (adição).

2) Menos binário (subtração).

Os operadores binários `+` e `-` têm [precedência](<#/doc/language/operator_precedence>) maior do que todos os outros operadores aritméticos binários, exceto `*`, `/` e `%`. Esses operadores associam da esquerda para a direita:
```cpp
    a + b * c;  // equivalente a a + (b * c), NÃO (a + b) * c
    d / e - f;  // equivalente a (d / e) - f, NÃO d / (e - f)
    g + h >> i; // equivalente a (g + h) >> i, NÃO g + (h >> i)
    
    j - k + l - m; // equivalente a ((j - k) + l) - m
```

#### Operadores aditivos embutidos

Para os operadores mais binário e menos binário embutidos, ambos lhs e rhs devem ser prvalues, e uma das seguintes condições deve ser satisfeita:

*   Ambos os operandos têm tipo aritmético ou de enumeração não escopada. Neste caso, as [conversões aritméticas usuais](<#/doc/language/usual_arithmetic_conversions>) são realizadas em ambos os operandos.
*   Exatamente um operando tem tipo integral ou de enumeração não escopada. Neste caso, a promoção integral é aplicada a esse operando.

Na descrição restante desta seção, "operando(s)", lhs e rhs referem-se ao(s) operando(s) convertido(s) ou promovido(s).

1) Para a adição embutida, uma das seguintes condições deve ser satisfeita:

*   Ambos os operandos têm tipo aritmético. Neste caso, o resultado é a soma dos operandos.
*   Um operando é um ponteiro para um tipo de objeto completamente definido, e o outro operando tem tipo integral. Neste caso, o valor integral é adicionado ao ponteiro (veja [aritmética de ponteiros](<#/doc/language/operator_arithmetic>)).

2) Para a subtração embutida, uma das seguintes condições deve ser satisfeita:

*   Ambos os operandos têm tipo aritmético. Neste caso, o resultado é a diferença resultante da subtração de rhs de lhs.
*   lhs é um ponteiro para um tipo de objeto completamente definido, e rhs tem tipo integral. Neste caso, o valor integral é subtraído do ponteiro (veja [aritmética de ponteiros](<#/doc/language/operator_arithmetic>)).
*   Ambos os operandos são ponteiros para versões cv-qualificadas ou cv-não-qualificadas do mesmo tipo de objeto completamente definido. Neste caso, rhs é subtraído de lhs (veja [aritmética de ponteiros](<#/doc/language/operator_arithmetic>)).

Se ambos os operandos tiverem um tipo de ponto flutuante, e o tipo suportar aritmética de ponto flutuante IEEE (veja [std::numeric_limits::is_iec559](<#/doc/types/numeric_limits/is_iec559>)):

*   Se um operando for NaN, o resultado é NaN.
*   Infinito menos infinito é NaN, e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
*   Infinito mais infinito negativo é NaN, e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.

#### Aritmética de ponteiros

Quando uma expressão J de tipo integral é adicionada ou subtraída de uma expressão P de tipo ponteiro, o resultado tem o tipo de P.

*   Se P avalia para um [valor de ponteiro nulo](<#/doc/language/pointer>) e J avalia para ​0​, o resultado é um valor de ponteiro nulo.
*   Caso contrário, se P aponta para o `i`-ésimo elemento de um objeto array x com n elementos, dado o valor de J como j, P é adicionado ou subtraído da seguinte forma:

    *   As expressões P + J e J + P

        *   apontam para o `i+j`-ésimo elemento de x se i + j estiver em `[`​0​`, `n`)`, e
        *   são ponteiros após o final do último elemento de x se i + j for n.

    *   A expressão P - J

        *   aponta para o `i-j`-ésimo elemento de x se i - j estiver em `[`​0​`, `n`)`, e
        *   é um ponteiro após o final do último elemento de x se i - j for n.

    *   Outros valores de j resultam em comportamento indefinido.

*   Caso contrário, se P aponta para um objeto completo, um subobjeto de classe base ou um subobjeto membro y, dado o valor de J como j, P é adicionado ou subtraído da seguinte forma:

    *   As expressões P + J e J + P

        *   apontam para y se j for ​0​, e
        *   são ponteiros após o final de y se j for 1.

    *   A expressão P - J

        *   aponta para y se j for ​0​, e
        *   é um ponteiro após o final de y se j for -1.

    *   Outros valores de j resultam em comportamento indefinido.

*   Caso contrário, se P é um ponteiro após o final de um objeto z, dado o valor de J como j:

    *   Se z é um objeto array com n elementos, P é adicionado ou subtraído da seguinte forma:

        *   As expressões P + J e J + P

            *   apontam para o `n+j`-ésimo elemento de z se n + j estiver em `[`​0​`, `n`)`, e
            *   são ponteiros após o final do último elemento de z se j for ​0​.

        *   A expressão P - J

            *   aponta para o `n-j`-ésimo elemento de z se n - j estiver em `[`​0​`, `n`)`, e
            *   é um ponteiro após o final do último elemento de z se j for ​0​.

        *   Outros valores de j resultam em comportamento indefinido.

    *   Caso contrário, P é adicionado ou subtraído da seguinte forma:

        *   As expressões P + J e J + P

            *   apontam para z se j for -1, e
            *   são ponteiros após o final de z se j for ​0​.

        *   A expressão P - J

            *   aponta para z se j for 1, e
            *   é um ponteiro após o final de z se j for ​0​.

        *   Outros valores de j resultam em comportamento indefinido.

*   Caso contrário, o comportamento é indefinido.

Quando duas expressões de ponteiro P e Q são subtraídas, o tipo do resultado é [std::ptrdiff_t](<#/doc/types/ptrdiff_t>).

*   Se P e Q ambos avaliam para [valores de ponteiro nulo](<#/doc/language/pointer>), o resultado é ​0​.
*   Caso contrário, se P e Q apontam, respectivamente, para o `i`-ésimo e `j`-ésimo elementos do mesmo objeto array x, a expressão P - Q tem o valor i − j.

    *   Se i − j não for representável por [std::ptrdiff_t](<#/doc/types/ptrdiff_t>), o comportamento é indefinido.

*   Caso contrário, se P e Q apontam para o mesmo objeto completo, subobjeto de classe base ou subobjeto membro, o resultado é ​0​.
*   Caso contrário, o comportamento é indefinido.

Esses operadores de aritmética de ponteiros permitem que os ponteiros satisfaçam os requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>).

Para adição e subtração, se P ou Q tiverem o tipo “ponteiro para `T` (possivelmente cv-qualificado)”, onde `T` e o tipo do elemento do array não são [similares](<#/doc/language/implicit_cast>), o comportamento é indefinido:
```cpp
    int arr[5] = {1, 2, 3, 4, 5};
    unsigned int *p = reinterpret_cast<unsigned int*>(arr + 1);
    unsigned int k = *p; // OK, o valor de “k” é 2
    unsigned int *q = p + 1; // comportamento indefinido: “p” aponta para int, não unsigned int
```

#### Sobrecargas

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada par de tipos aritméticos promovidos `L` e `R` e para cada tipo de objeto `T`, as seguintes assinaturas de função participam da resolução de sobrecarga:

LR operator+(L, R)
---|---|
LR operator-(L, R)
T* operator+(T*, std::ptrdiff_t)
T* operator+(std::ptrdiff_t, T*)
T* operator-(T*, std::ptrdiff_t)
std::ptrdiff_t operator-(T*, T*)

onde `LR` é o resultado das [conversões aritméticas usuais](<#/doc/language/usual_arithmetic_conversions>) em `L` e `R`.

Execute este código
```cpp
    #include <iostream>
    
    int main()
    {
        char c = 2;
        unsigned int un = 2;
        int n = -10;
        std::cout << " 2 + (-10), onde 2 é um char    = " << c + n << "\n"
                     " 2 + (-10), onde 2 é unsigned  = " << un + n << "\n"
                     " -10 - 2.12  = " << n - 2.12 << '\n';
    
        char a[4] = {'a', 'b', 'c', 'd'};
        char* p = &a[1];
        std::cout << "Exemplos de adição de ponteiro: " << *p << *(p + 2)
                  << *(2 + p) << *(p - 1) << '\n';
        char* p2 = &a[4];
        std::cout << "Diferença de ponteiro: " << p2 - p << '\n';
    }
```

Saída:
```
     2 + (-10), onde 2 é um char    = -8
     2 + (-10), onde 2 é unsigned  = 4294967288
     -10 - 2.12  = -12.12
    Exemplos de adição de ponteiro: bdda
    Diferença de ponteiro: 3
```

#### Operadores multiplicativos

As expressões de operadores multiplicativos têm a forma

---
lhs `*` rhs | (1) |
---|---|---
lhs `/` rhs | (2) |
lhs `%` rhs | (3) |

1) Multiplicação.

2) Divisão.

3) Resto.

Os operadores multiplicativos têm [precedência](<#/doc/language/operator_precedence>) maior do que todos os outros operadores aritméticos binários. Esses operadores associam da esquerda para a direita:
```cpp
    a + b * c;  // equivalente a a + (b * c), NÃO (a + b) * c
    d / e - f;  // equivalente a (d / e) - f, NÃO d / (e - f)
    g % h >> i; // equivalente a (g % h) >> i, NÃO g % (h >> i)
    
    j * k / l % m; // equivalente a ((j * k) / l) % m
```

#### Operadores multiplicativos embutidos

Para os operadores de multiplicação e divisão embutidos, ambos os operandos devem ter tipo aritmético ou de enumeração não escopada. Para o operador de resto embutido, ambos os operandos devem ter tipo integral ou de enumeração não escopada. As [conversões aritméticas usuais](<#/doc/language/usual_arithmetic_conversions>) são realizadas em ambos os operandos.

Na descrição restante desta seção, "operando(s)", lhs e rhs referem-se ao(s) operando(s) convertido(s).

1) O resultado da multiplicação embutida é o produto dos operandos.

Se ambos os operandos tiverem um tipo de ponto flutuante, e o tipo suportar aritmética de ponto flutuante IEEE (veja [std::numeric_limits::is_iec559](<#/doc/types/numeric_limits/is_iec559>)):

*   A multiplicação de um NaN por qualquer número resulta em NaN.
*   A multiplicação de infinito por zero resulta em NaN e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.

2) O resultado da divisão embutida é lhs dividido por rhs. Se rhs for zero, o comportamento é indefinido.

Se ambos os operandos tiverem um tipo integral, o resultado é o quociente algébrico (realiza divisão inteira): o quociente é truncado em direção a zero (a parte fracionária é descartada).

Se ambos os operandos tiverem um tipo de ponto flutuante, e o tipo suportar aritmética de ponto flutuante IEEE (veja [std::numeric_limits::is_iec559](<#/doc/types/numeric_limits/is_iec559>)):

*   Se um operando for NaN, o resultado é NaN.
*   Dividir um número não-zero por ±0.0 resulta no infinito com sinal correto e [FE_DIVBYZERO](<#/doc/numeric/fenv/FE_exceptions>) é levantado.
*   Dividir 0.0 por 0.0 resulta em NaN e [FE_INVALID](<#/doc/numeric/fenv/FE_exceptions>) é levantado.

3) O resultado do resto embutido é o resto da divisão inteira de lhs por rhs. Se rhs for zero, o comportamento é indefinido.

Se a / b for representável no tipo de resultado, (a / b) * b + a % b == a.

Se a / b não for representável no tipo de resultado, o comportamento de ambos a / b e a % b é indefinido (o que significa que [INT_MIN](<#/doc/types/climits>) % -1 é indefinido em sistemas de complemento de dois).

Nota: Até que a [questão CWG 614](<https://cplusplus.github.io/CWG/issues/614.html>) fosse resolvida ([N2757](<https://wg21.link/n2757>)), se um ou ambos os operandos do operador binário % fossem negativos, o sinal do resto era definido pela implementação, pois depende da direção de arredondamento da divisão inteira. A função [std::div](<#/doc/numeric/math/div>) fornecia comportamento bem definido nesse caso.

Nota: para o resto de ponto flutuante, veja [std::remainder](<#/doc/numeric/math/remainder>) e [std::fmod](<#/doc/numeric/math/fmod>).

#### Sobrecargas

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada par de tipos aritméticos promovidos `LA` e `RA` e para cada par de tipos integrais promovidos `LI` e `RI`, as seguintes assinaturas de função participam da resolução de sobrecarga:

LRA operator*(LA, RA)
---|---|
LRA operator/(LA, RA)
LRI operator%(LI, RI)

onde `LRx` é o resultado das [conversões aritméticas usuais](<#/doc/language/usual_arithmetic_conversions>) em `Lx` e `Rx`.

Execute este código
```cpp
    #include <iostream>
    
    int main()
    {
        char c = 2;
        unsigned int un = 2;
        int  n = -10;
        std::cout << "2 * (-10), onde 2 é um char    = " << c * n << "\n"
                     "2 * (-10), onde 2 é unsigned  = " << un * n << "\n"
                     "-10 / 2.12  = " << n / 2.12 << "\n"
                     "-10 / 21  = " << n / 21 << "\n"
                     "-10 % 21  = " << n % 21 << '\n';
    }
```

Saída:
```
    2 * (-10), onde 2 é um char    = -20
    2 * (-10), onde 2 é unsigned  = 4294967276
    -10 / 2.12  = -4.71698
    -10 / 21  = 0
    -10 % 21  = -10
```

### Operadores lógicos bit a bit

As expressões de operadores lógicos bit a bit têm a forma

---
`~` rhs | (1) |
---|---|---
lhs `&` rhs | (2) |
lhs `|` rhs | (3) |
lhs `^` rhs | (4) |

1) NOT bit a bit.

2) AND bit a bit.

3) OR bit a bit.

4) XOR bit a bit.

O operador NOT bit a bit tem [precedência](<#/doc/language/operator_precedence>) maior do que todos os operadores aritméticos binários. Ele associa da direita para a esquerda:
```cpp
    ~a - b; // equivalente a (~a) - b, NÃO ~(a - b)
    ~c * d; // equivalente a (~c) * d, NÃO ~(c * d)
    
    ~-e; // equivalente a ~(-e)
```

Existe uma ambiguidade na gramática quando ~ é seguido por um [nome de tipo](<#/doc/language/type-id>) ou especificador [`decltype`](<#/doc/language/decltype>) (desde C++11): ele pode ser operator~ ou iniciar um identificador de [destrutor](<#/doc/language/destructor>). A ambiguidade é resolvida tratando ~ como operator~. ~ pode iniciar um identificador de destrutor apenas em locais onde a formação de um operator~ é sintaticamente inválida.

Todos os outros operadores lógicos bit a bit têm [precedência](<#/doc/language/operator_precedence>) menor do que todos os outros operadores aritméticos binários. O AND bit a bit tem precedência maior do que o XOR bit a bit, que tem precedência maior do que o OR bit a bit. Eles associam da esquerda para a direita:
```cpp
    a & b * c;  // equivalente a a & (b * c), NÃO (a & b) * c
    d / e ^ f;  // equivalente a (d / e) ^ f, NÃO d / (e ^ f)
    g << h | i; // equivalente a (g << h) | i, NÃO g << (h | i)
    
    j & k & l; // equivalente a (j & k) & l
    m | n ^ o  // equivalente a m | (n ^ o)
```

#### Operadores lógicos bit a bit embutidos

Para o operador NOT bit a bit embutido, rhs deve ser um prvalue de tipo integral ou de enumeração não escopada, e a promoção integral é realizada em rhs. Para outros operadores lógicos bit a bit embutidos, ambos os operandos devem ter tipo integral ou de enumeração não escopada, e as [conversões aritméticas usuais](<#/doc/language/usual_arithmetic_conversions>) são realizadas em ambos os operandos.

Na descrição restante desta seção, "operando(s)", lhs e rhs referem-se ao(s) operando(s) convertido(s) ou promovido(s).

1) Dado o operando como x e o resultado da operação NOT bit a bit embutida como r. Para cada coeficiente x_i da representação em base 2 de x, o coeficiente correspondente r_i da representação em base 2 de r é 1 se x_i for ​0​, e ​0​ caso contrário.

*   Em outras palavras, o resultado é o complemento de um do operando (onde operando e resultado são considerados sem sinal).

O tipo do resultado r é o tipo do operando x.

2-4) Dados os operandos como x e y respectivamente e o resultado das operações lógicas binárias bit a bit embutidas como r. Para cada par de coeficientes x_i e y_i das representações em base 2 de x e y respectivamente, o coeficiente correspondente r_i da representação em base 2 de r é

2) 1 se ambos x_i e y_i forem 1, e ​0​ caso contrário.

3) 1 se pelo menos um de x_i e y_i for 1, e ​0​ caso contrário.

4) 1 se um (mas não ambos) de x_i e y_i for 1, e ​0​ caso contrário.

O tipo do resultado r é o tipo dos operandos x e y.

#### Sobrecargas

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada par de tipos integrais promovidos `L` e `R`, as seguintes assinaturas de função participam da resolução de sobrecarga:

R operator~(R)
---|---|
LR operator&(L, R)
LR operator^(L, R)
LR operator|(L, R)

onde `LR` é o resultado das [conversões aritméticas usuais](<#/doc/language/usual_arithmetic_conversions>) em `L` e `R`.

Execute este código
```cpp
    #include <bitset>
    #include <cstdint>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        std::uint16_t mask = 0x00f0;
        std::uint32_t x0 = 0x12345678;
        std::uint32_t x1 = x0 | mask;
        std::uint32_t x2 = x0 & ~mask;
        std::uint32_t x3 = x0 & mask;
        std::uint32_t x4 = x0 ^ mask;
        std::uint32_t x5 = ~x0;
        using bin16 = std::bitset<16>;
        using bin32 = std::bitset<32>;
        std::cout << std::hex << std::showbase
                  << "Máscara: " << mask << std::setw(49) << bin16(mask) << "\n"
                     "Valor: " << x0 << std::setw(42) << bin32(x0) << "\n"
                     "Definindo bits: " << x1 << std::setw(35) << bin32(x1) << "\n"
                     "Limpando bits: " << x2 << std::setw(34) << bin32(x2) << "\n"
                     "Selecionando bits: " << x3 << std::setw(39) << bin32(x3) << "\n"
                     "Fazendo XOR de bits: " << x4 << std::setw(35) << bin32(x4) << "\n"
                     "Invertendo bits: " << x5 << std::setw(33) << bin32(x5) << '\n';
    }
```

Saída:
```
    Máscara: 0xf0                                 0000000011110000
    Valor: 0x12345678          00010010001101000101011001111000
    Definindo bits: 0x123456f8   00010010001101000101011011111000
    Limpando bits: 0x12345608  00010010001101000101011000001000
    Selecionando bits: 0x70       00000000000000000000000001110000
    Fazendo XOR de bits: 0x12345688   00010010001101000101011010001000
    Invertendo bits: 0xedcba987 11101101110010111010100110000111
```

### Operadores de deslocamento bit a bit

As expressões de operadores de deslocamento bit a bit têm a forma

---
lhs `< <` rhs | (1) |
---|---|---
lhs `> >` rhs | (2) |

1) Deslocamento à esquerda bit a bit.

2) Deslocamento à direita bit a bit.

Os operadores de deslocamento bit a bit têm [precedência](<#/doc/language/operator_precedence>) maior do que os operadores lógicos bit a bit, mas têm precedência menor do que os operadores aditivos e multiplicativos. Esses operadores associam da esquerda para a direita:
```cpp
    a >> b * c;  // equivalente a a >> (b * c), NÃO (a >> b) * c
    d << e & f;  // equivalente a (d << e) & f, NÃO d << (e & f)
    
    g << h >> i; // equivalente a (g << h) >> i, NÃO g << (h >> i)
```

#### Operadores de deslocamento bit a bit embutidos

Para os operadores de deslocamento bit a bit embutidos, ambos os operandos devem ser prvalues de tipo integral ou de enumeração não escopada. Promoções integrais são realizadas em ambos os operandos.

Na descrição restante desta seção, "operando(s)", a, b, lhs e rhs referem-se ao(s) operando(s) convertido(s) ou promovido(s).

Se o valor de rhs for negativo ou não for menor que o número de bits em lhs, o comportamento é indefinido.

Para `a` sem sinal, o valor de a << b é o valor de a * 2b, reduzido módulo 2N, onde N é o número de bits no tipo de retorno (ou seja, o deslocamento à esquerda bit a bit é realizado e os bits que são deslocados para fora do tipo de destino são descartados). Para `a` com sinal e não negativo, se a * 2b for representável na versão sem sinal do tipo de retorno, então esse valor, [convertido](<#/doc/language/implicit_cast>) para com sinal, é o valor de a << b (isso torna legal criar [INT_MIN](<#/doc/types/climits>) como 1 << 31); caso contrário, o comportamento é indefinido. Para `a` negativo, o comportamento de a << b é indefinido. Para `a` sem sinal e para `a` com sinal e não negativo, o valor de a >> b é a parte inteira de a/2b. Para `a` negativo, o valor de a >> b é definido pela implementação (na maioria das implementações, isso realiza um deslocamento aritmético à direita, de modo que o resultado permanece negativo). | (até C++20)
---|---
O valor de a << b é o valor único congruente a a * 2b módulo 2N, onde N é o número de bits no tipo de retorno (ou seja, o deslocamento à esquerda bit a bit é realizado e os bits que são deslocados para fora do tipo de destino são descartados). O valor de a >> b é a/2b, arredondado em direção ao infinito negativo (em outras palavras, o deslocamento à direita em `a` com sinal é um deslocamento aritmético à direita). | (desde C++20)

O tipo do resultado é o de lhs.

#### Sobrecargas

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada par de tipos integrais promovidos `L` e `R`, as seguintes assinaturas de função participam da resolução de sobrecarga:

L operator<<(L, R)
---|---|
L operator>>(L, R)

Execute este código
```cpp
    #include <iostream>
    
    enum { ONE = 1, TWO = 2 };
    
    int main()
    {
        std::cout << std::hex << std::showbase;
        char c = 0x10;
        unsigned long long ull = 0x123;
        std::cout << "0x123 << 1 = " << (ull << 1) << "\n"
                     "0x123 << 63 = " << (ull << 63) << "\n" // overflow in unsigned
                     "0x10 << 10 = " << (c << 10) << '\n';   // char is promoted to int
        long long ll = -1000;
        std::cout << std::dec << "-1000 >> 1 = " << (ll >> ONE) << '\n';
    }
```

Saída:
```
    0x123 << 1 = 0x246
    0x123 << 63 = 0x8000000000000000
    0x10 << 10 = 0x4000
    -1000 >> 1 = -500
```

### Standard library

Operadores aritméticos são sobrecarregados para muitos tipos da standard library.

#### Operadores aritméticos unários

[ operator+operator-](<#/doc/chrono/duration/operator_arith>) | implementa + unário e - unário
(função membro pública de `std::chrono::duration<Rep,Period>`)
[ operator+operator-](<#/doc/numeric/complex/operator_arith2>) | aplica operadores unários a números complexos
(function template)
[ operator+operator-operator~operator!](<#/doc/numeric/valarray/operator_arith>) | aplica um operador aritmético unário a cada elemento do valarray
(função membro pública de `std::valarray<T>`)

#### Operadores Aditivos

[ operator+operator-](<#/doc/chrono/time_point/operator_arith2>)(desde C++11) | realiza operações de adição e subtração envolvendo um time point
(function template)
[ operator+operator-operator*operator/operator%](<#/doc/chrono/duration/operator_arith4>)(desde C++11) | implementa operações aritméticas com durations como argumentos
(function template)
[ operator+operator-](<#/doc/chrono/year_month_day/operator_arith_2>)(desde C++20) | adiciona ou subtrai um `year_month_day` e um número de anos ou meses
(função)
[ operator+](<#/>) | concatena duas strings, uma string e um char, ou uma string e [string_view](<#/doc/string/basic_string_view>)
(function template)
[ operator+operator-](<#/doc/iterator/reverse_iterator/operator_arith>) | avança ou decrementa o iterator
(função membro pública de `std::reverse_iterator<Iter>`)
[ operator+operator-](<#/doc/iterator/move_iterator/operator_arith>) | avança ou decrementa o iterator
(função membro pública de `std::move_iterator<Iter>`)
[ operator+operator-operator*operator/](<#/doc/numeric/complex/operator_arith3>) | realiza aritmética de números complexos em dois valores complexos ou um complexo e um escalar
(function template)
[ operator+operator-operator*operator/operator%operator&operator|operator^operator<&lt;operator&gt;>operator&&operator||](<#/doc/numeric/valarray/operator_arith3>) | aplica operadores binários a cada elemento de dois valarrays, ou um valarray e um valor
(function template)

#### Operadores Multiplicativos

[ operator+operator-operator*operator/operator%](<#/doc/chrono/duration/operator_arith4>)(desde C++11) | implementa operações aritméticas com durations como argumentos
(function template)
[ operator+operator-operator*operator/](<#/doc/numeric/complex/operator_arith3>) | realiza aritmética de números complexos em dois valores complexos ou um complexo e um escalar
(function template)
[ operator+operator-operator*operator/operator%operator&operator|operator^operator<&lt;operator&gt;>operator&&operator||](<#/doc/numeric/valarray/operator_arith3>) | aplica operadores binários a cada elemento de dois valarrays, ou um valarray e um valor
(function template)

#### Operadores Lógicos Bit a Bit

[ operator&=operator|=operator^=operator~](<#/doc/utility/bitset/operator_logic>) | realiza AND, OR, XOR e NOT binários
(função membro pública de `std::bitset<N>`)
[ operator&operator|operator^](<#/doc/utility/bitset/operator_logic2>) | realiza operações lógicas binárias em bitsets
(function template)
[ operator~](<#/doc/numeric/valarray/operator_arith>) | aplica um operador aritmético unário a cada elemento do valarray
(função membro pública de `std::valarray<T>`)
[ operator^operator&operator|](<#/doc/numeric/valarray/operator_arith3>) | aplica operadores binários a cada elemento de dois valarrays, ou um valarray e um valor
(function template)

#### Operadores de Deslocamento de Bits

[ operator<&lt;operator&gt;>](<#/doc/numeric/valarray/operator_arith3>) | aplica operadores binários a cada elemento de dois valarrays, ou um valarray e um valor
(function template)
[ operator<&lt;operator&gt;>](<#/doc/utility/bitset/operator_ltltgtgt>) | realiza deslocamento binário para a esquerda e para a direita
(função membro pública de `std::bitset<N>`)

#### Operadores de Inserção/Extração de Stream

Em toda a standard library, os operadores de deslocamento de bits são comumente sobrecarregados com stream de E/S ([std::ios_base](<#/doc/io/ios_base>)& ou uma das classes derivadas dela) como o operando esquerdo e o tipo de retorno. Tais operadores são conhecidos como operadores de _inserção de stream_ e _extração de stream_:

[ operator>>](<#/doc/io/basic_istream/operator_gtgt>) | extrai dados formatados
(função membro pública de `std::basic_istream<CharT,Traits>`)
[ operator>>(std::basic_istream)](<#/doc/io/basic_istream/operator_gtgt2>) | extrai caracteres e arrays de caracteres
(function template)
[ operator<<](<#/doc/io/basic_ostream/operator_ltlt>) | insere dados formatados
(função membro pública de `std::basic_ostream<CharT,Traits>`)
[ operator<<(std::basic_ostream)](<#/doc/io/basic_ostream/operator_ltlt2>) | insere dados de caracteres ou insere em rvalue stream
(function template)
[ operator<&lt;operator&gt;>](<#/doc/numeric/complex/operator_ltltgtgt>) | serializa e desserializa um número complexo
(function template)
[ operator<&lt;operator&gt;>](<#/doc/utility/bitset/operator_ltltgtgt2>) | realiza entrada e saída de stream de bitsets
(function template)
[ operator<&lt;operator&gt;>](<#/doc/string/basic_string/operator_ltltgtgt>) | realiza entrada e saída de stream em strings
(function template)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/linear_congruential_engine/operator_ltltgtgt>)(desde C++11) | realiza entrada e saída de stream em um motor de números pseudoaleatórios
(function template)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/uniform_int_distribution/operator_ltltgtgt>)(desde C++11) | realiza entrada e saída de stream em uma distribuição de números pseudoaleatórios
(function template)

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 614](<https://cplusplus.github.io/CWG/issues/614.html>) | C++98 | o quociente algébrico da divisão inteira era arredondado em direção definida pela implementação | o quociente algébrico da divisão inteira é truncado em direção a zero (a parte fracionária é descartada)
[CWG 1450](<https://cplusplus.github.io/CWG/issues/1450.html>) | C++98 | o resultado de a / b era não especificado se não fosse representável no tipo de resultado | o comportamento de ambos a / b e a % b é indefinido neste caso
[CWG 1457](<https://cplusplus.github.io/CWG/issues/1457.html>) | C++98 | o comportamento de deslocar o bit `1` mais à esquerda de um valor assinado positivo para o bit de sinal era indefinido | tornou-se bem definido
[CWG 1504](<https://cplusplus.github.io/CWG/issues/1504.html>) | C++98 | um ponteiro para um subobjeto de classe base de um elemento de array poderia ser usado em aritmética de ponteiros | o comportamento é indefinido neste caso
[CWG 1515](<https://cplusplus.github.io/CWG/issues/1515.html>) | C++98 | apenas inteiros sem sinal que declarados sem sinal deveriam obedecer às leis da aritmética módulo 2n | aplica-se a todos os inteiros sem sinal
[CWG 1642](<https://cplusplus.github.io/CWG/issues/1642.html>) | C++98 | operadores aritméticos permitiam que seus operandos fossem lvalues | alguns operandos devem ser rvalues
[CWG 1865](<https://cplusplus.github.io/CWG/issues/1865.html>) | C++98 | a resolução do [problema CWG 1504](<https://cplusplus.github.io/CWG/issues/1504.html>) tornou os comportamentos da aritmética de ponteiros envolvendo ponteiros para elementos de array indefinidos se o tipo apontado e o tipo do elemento do array tivessem diferentes qualificadores cv em níveis não-superiores | tornou-se bem definido
[CWG 1971](<https://cplusplus.github.io/CWG/issues/1971.html>) | C++98 | não estava claro se a regra que resolvia a ambiguidade de ~ se aplicava a casos como ~X(0) | a regra se aplica a tais casos
[CWG 2419](<https://cplusplus.github.io/CWG/issues/2419.html>) | C++98 | um ponteiro para um objeto não-array era tratado apenas como um ponteiro para o primeiro elemento de um array de tamanho 1 em aritmética de ponteiros se o ponteiro fosse obtido por & | aplica-se a todos os ponteiros para objetos não-array
[CWG 2626](<https://cplusplus.github.io/CWG/issues/2626.html>) | C++98 | o resultado do `operator~` embutido era simplesmente 'complemento de um' sem definição adequada | o resultado é expresso em termos da representação em base 2
[CWG 2724](<https://cplusplus.github.io/CWG/issues/2724.html>) | C++20 | a direção de arredondamento do deslocamento aritmético à direita não estava clara | tornou-se clara
[CWG 2853](<https://cplusplus.github.io/CWG/issues/2853.html>) | C++98 | um ponteiro além do final de um objeto não podia ser adicionado ou subtraído com um inteiro | ele pode

### Ver também

[Precedência de operadores](<#/doc/language/operator_precedence>)

[Sobrecarga de operadores](<#/doc/language/operators>)

Operadores comuns
---
[atribuição](<#/doc/language/operator_assignment>) | [incremento decremento](<#/doc/language/operator_incdec>) | **aritméticos** | [lógicos](<#/doc/language/operator_logical>) | [comparação](<#/doc/language/operator_comparison>) | [acesso a membro](<#/doc/language/operator_member_access>) | [outros](<#/doc/language/operator_other>)
a = b
a += b
a -= b
a *= b
a /= b
a %= b
a &= b
a |= b
a ^= b
a <<= b
a >>= b | ++a
--a
a++
a-- | +a
-a
a + b
a - b
a * b
a / b
a % b
~a
a & b
a | b
a ^ b
a << b
a >> b | !a
a && b
a || b | a == b
a != b
a < b
a > b
a <= b
a >= b
a <=> b | a[...]
*a
&a
a->b
a.b
a->*b
a.*b | chamada de função

a(...)
vírgula

a, b
condicional

a ? b : c
Operadores especiais
[`static_cast`](<#/doc/language/static_cast>) converte um tipo em outro tipo relacionado
[`dynamic_cast`](<#/doc/language/dynamic_cast>) converte dentro de hierarquias de herança
[`const_cast`](<#/doc/language/const_cast>) adiciona ou remove qualificadores [cv](<#/doc/language/cv>)
[`reinterpret_cast`](<#/doc/language/reinterpret_cast>) converte um tipo em um tipo não relacionado
[C-style cast](<#/doc/language/explicit_cast>) converte um tipo em outro por uma mistura de static_cast, const_cast e reinterpret_cast
[`new`](<#/doc/language/new>) cria objetos com duração de armazenamento dinâmica
[`delete`](<#/doc/language/delete>) destrói objetos criados anteriormente pela expressão new e libera a área de memória obtida
[`sizeof`](<#/doc/language/sizeof>) consulta o tamanho de um tipo
[`sizeof...`](<#/doc/language/sizeof...>) consulta o tamanho de um [pack](<#/doc/language/parameter_pack>) (desde C++11)
[`typeid`](<#/doc/language/typeid>) consulta as informações de tipo de um tipo
[`noexcept`](<#/doc/language/noexcept>) verifica se uma expressão pode lançar uma exceção (desde C++11)
[`alignof`](<#/doc/language/alignof>) consulta os requisitos de alinhamento de um tipo (desde C++11)
[Documentação C](<#/>) para operadores aritméticos
---