# Operadores de Comparação

Compara os argumentos.

Nome do Operador | Sintaxe | [Sobrecaregável](<#/doc/language/operators>) | Exemplos de protótipo (para a classe T)
---|---|---|---|---
Dentro da definição da classe | Fora da definição da classe
Igual a | `a == b` | Sim | bool T::operator==(const U& b) const; | bool operator==(const T& a, const U& b);
Diferente de | `a != b` | Sim | bool T::operator!=(const U& b) const; | bool operator!=(const T& a, const U& b);
Menor que | `a < b` | Sim | bool T::operator<(const U& b) const; | bool operator<(const T& a, const U& b);
Maior que | `a > b` | Sim | bool T::operator>(const U& b) const; | bool operator>(const T& a, const U& b);
Menor ou igual a | `a <= b` | Sim | bool T::operator<=(const U& b) const; | bool operator<=(const T& a, const U& b);
Maior ou igual a | `a >= b` | Sim | bool T::operator>=(const U& b) const; | bool operator>=(const T& a, const U& b);
Comparação de três vias (C++20) | `a <=> b` | Sim | `_R_` T::operator<=>(const U& b) const;[1](<#/doc/language/operator_comparison>) | `_R_` operator<=>(const T& a, const U& b);[1](<#/doc/language/operator_comparison>)

**Notas**

*   Onde operadores embutidos retornam bool, a maioria das [sobrecargas definidas pelo usuário](<#/doc/language/operators>) também retorna bool para que os operadores definidos pelo usuário possam ser usados da mesma maneira que os embutidos. No entanto, em uma sobrecarga de operador definida pelo usuário, qualquer tipo pode ser usado como tipo de retorno (incluindo void).
*   `U` pode ser qualquer tipo, incluindo `T`.

1.  ↑ [1.0](<#/doc/language/operator_comparison>) [1.1](<#/doc/language/operator_comparison>) `_R_` é o tipo de retorno de `operator<=>` ([veja abaixo](<#/doc/language/operator_comparison>))

### Comparação de duas vias

As expressões de operador de comparação de duas vias têm a forma

##### Operadores relacionais

---
lhs `<` rhs | (1) |
---|---|---
lhs `>` rhs | (2) |
lhs `< =` rhs | (3) |
lhs `> =` rhs | (4) |

##### Operadores de igualdade

---
lhs `==` rhs | (5) |
---|---|---
lhs `!=` rhs | (6) |

1) Retorna true se lhs for menor que rhs, false caso contrário.

2) Retorna true se lhs for maior que rhs, false caso contrário.

3) Retorna true se lhs for menor ou igual a rhs, false caso contrário.

4) Retorna true se lhs for maior ou igual a rhs, false caso contrário.

5) Retorna true se lhs for igual a rhs, false caso contrário.

6) Retorna true se lhs for diferente de rhs, false caso contrário.

#### Operadores de comparação de duas vias embutidos

Para operadores de comparação de duas vias embutidos, [conversões de lvalue para rvalue](<#/doc/language/implicit_cast>), [conversões de array para ponteiro](<#/doc/language/implicit_cast>)(ate C++26) e [conversões de função para ponteiro](<#/doc/language/implicit_cast>) são aplicadas a lhs e rhs.

A comparação é descontinuada se tanto lhs quanto rhs tiverem tipo array antes da aplicação dessas conversões. | (desde C++20)
(ate C++26)
Para operadores relacionais embutidos, se um dos operandos for um ponteiro, a [conversão de array para ponteiro](<#/doc/language/implicit_cast>) é realizada no outro operando. Para operadores de igualdade embutidos, se um dos operandos for um ponteiro ou uma [constante de ponteiro nulo](<#/doc/language/pointer>), a conversão de array para ponteiro é realizada no outro operando. | (desde C++26)

Para operadores de comparação de duas vias embutidos, o resultado é um prvalue bool.

#### Comparação aritmética embutida

Se os operandos convertidos tiverem tipo aritmético ou de enumeração (com escopo ou sem escopo), as [conversões aritméticas usuais](<#/doc/language/usual_arithmetic_conversions>) são realizadas em ambos os operandos. Os valores são comparados após as conversões:

Run this code
```cpp
    #include <iostream>
    
    int main()
    {
        static_assert(sizeof(unsigned char) < sizeof(int),
                      "Cannot compare signed and smaller unsigned properly");
        int a = -1;
        int b = 1;
        unsigned int c = 1;
        unsigned char d = 1;
    
        std::cout << std::boolalpha
                  << "Comparing two signed values:\n"
                     " -1 == 1 ? " << (a == b) << "\n"
                     " -1 <  1 ? " << (a <  b) << "\n"
                     " -1 >  1 ? " << (a >  b) << "\n"
                     "Comparing signed and unsigned:\n"
                     // may issue different-signedness warning:
                     " -1 == 1 ? " << (a == c) << "\n"
                     // may issue different-signedness warning:
                     " -1 <  1 ? " << (a <  c) << "\n"
                     // may issue different-signedness warning:
                     " -1 >  1 ? " << (a >  c) << "\n"
                     "Comparing signed and smaller unsigned:\n"
                     " -1 == 1 ? " << (a == d) << "\n"
                     " -1 <  1 ? " << (a <  d) << "\n"
                     " -1 >  1 ? " << (a >  d) << '\n';
    }
```

Output:
```
    Comparing two signed values:
     -1 == 1 ? false
     -1 <  1 ? true
     -1 >  1 ? false
    Comparing signed and unsigned:
     -1 == 1 ? false
     -1 <  1 ? false
     -1 >  1 ? true
    Comparing signed and smaller unsigned:
     -1 == 1 ? false
     -1 <  1 ? true
     -1 >  1 ? false
```

#### Comparação de igualdade de ponteiros embutida

Os operandos convertidos dos operadores de igualdade `==` e `!=` também podem ter o tipo [std::nullptr_t](<#/doc/types/nullptr_t>),(desde C++11) tipo ponteiro ou tipo ponteiro para membro.

A comparação de igualdade de ponteiros embutida tem três resultados possíveis: igual, diferente e não especificado. Os valores produzidos pelos operadores de igualdade para a comparação de igualdade de ponteiros embutida estão listados abaixo:

Resultado da comparação
de p e q | Valor produzido por
---|---
p == q | p != q
igual | true | false
diferente | false | true
não especificado | valor bool não especificado

Se pelo menos um dos lhs e rhs convertidos for um ponteiro, [conversões de ponteiro](<#/doc/language/implicit_cast>), [conversões de ponteiro de função](<#/doc/language/implicit_cast>)(desde C++17) e [conversões de qualificação](<#/doc/language/implicit_cast>) são realizadas em ambos os operandos convertidos para levá-los ao seu [tipo de ponteiro composto](<#/doc/language/pointer>). Os dois ponteiros do tipo de ponteiro composto são comparados da seguinte forma:

*   Se um ponteiro [representa o endereço](<#/doc/language/pointer>) de um objeto completo, e outro ponteiro
    *   representa o endereço após o final de um objeto completo não-array diferente, ou
    *   representa o endereço um após o último elemento de um objeto array completo diferente,
    o resultado da comparação é não especificado.
*   Caso contrário, se os ponteiros forem ambos nulos, ambos apontarem para a mesma função, ou ambos representarem o mesmo endereço (ou seja, eles apontam para ou estão após o final do mesmo objeto), eles se comparam como iguais.
*   Caso contrário, os ponteiros se comparam como diferentes.

Se pelo menos um dos lhs e rhs convertidos for um ponteiro para membro, [conversões de ponteiro para membro](<#/doc/language/implicit_cast>), [conversões de ponteiro de função](<#/doc/language/implicit_cast>)(desde C++17) e [conversões de qualificação](<#/doc/language/implicit_cast>) são realizadas em ambos os operandos convertidos para levá-los ao seu [tipo de ponteiro composto](<#/doc/language/pointer>). Os dois ponteiros para membros do tipo de ponteiro composto são comparados da seguinte forma:

*   Se dois ponteiros para membros forem ambos o valor de ponteiro de membro nulo, eles se comparam como iguais.
*   Se apenas um dos dois ponteiros para membros for o valor de ponteiro de membro nulo, eles se comparam como diferentes.
*   Se qualquer um for um ponteiro para uma [função membro virtual](<#/doc/language/virtual>), o resultado é não especificado.
*   Se um se refere a um membro da classe `C1` e o outro se refere a um membro de uma classe `C2` diferente, onde nenhum é uma classe base do outro, o resultado é não especificado.
*   Se ambos se referem a membros (possivelmente diferentes) da mesma [union](<#/doc/language/union>), eles se comparam como iguais.
*   Caso contrário, dois ponteiros para membros se comparam como iguais se eles se referissem ao mesmo membro do mesmo [objeto mais derivado](<#/doc/language/objects>) ou ao mesmo subobjeto se a indireção com um objeto hipotético do tipo de classe associado fosse realizada, caso contrário, eles se comparam como diferentes.

```cpp
    struct P {};
    struct Q : P { int x; };
    struct R : P { int x; };
    
    int P::*bx = (int(P::*)) &Q::x;
    int P::*cx = (int(P::*)) &R::x;
    
    bool b1 = (bx == cx); // unspecified
    
    struct B
    {
        int f();
    };
    struct L : B {};
    struct R : B {};
    struct D : L, R {};
    
    int (B::*pb)() = &B::f;
    int (L::*pl)() = pb;
    int (R::*pr)() = pb;
    int (D::*pdl)() = pl;
    int (D::*pdr)() = pr;
    
    bool x = (pdl == pdr); // false
    bool y = (pb == pl);   // true
```

Dois operandos do tipo [std::nullptr_t](<#/doc/types/nullptr_t>) ou um operando do tipo [std::nullptr_t](<#/doc/types/nullptr_t>) e o outro uma constante de ponteiro nulo se comparam como iguais. | (desde C++11)

#### Comparação relacional de ponteiros embutida

Os operandos convertidos dos operadores relacionais `>`, `<`, `>=` e `<=` também podem ter tipo ponteiro.

A comparação relacional de ponteiros embutida em ponteiros p e q desiguais tem três resultados possíveis: p é maior, q é maior e não especificado. Os valores produzidos pelos operadores relacionais para a comparação relacional de ponteiros embutida estão listados abaixo:

Resultado da comparação
de p e q | Valor produzido por p > q | p < q | p >= q | p <= q igual | false | false | true | true
---|---|---|---|---
p é maior | true | false | true | false
q é maior | false | true | false | true
não especificado | valor bool não especificado

Se lhs e rhs convertidos forem ambos ponteiros, [conversões de ponteiro](<#/doc/language/implicit_cast>), [conversões de ponteiro de função](<#/doc/language/implicit_cast>)(desde C++17) e [conversões de qualificação](<#/doc/language/implicit_cast>) são realizadas em ambos os operandos convertidos para levá-los ao seu [tipo de ponteiro composto](<#/doc/language/pointer>). Os dois ponteiros do tipo de ponteiro composto são comparados da seguinte forma:

*   Se os ponteiros se comparam como iguais ou o resultado da comparação de igualdade é não especificado, o resultado da comparação relacional cai na mesma categoria.
*   Caso contrário (os ponteiros se comparam como diferentes), se qualquer um dos ponteiros não for um ponteiro para objeto, o resultado é não especificado.
*   Caso contrário (ambos os ponteiros apontam para objetos), o resultado é definido em termos de uma ordem parcial consistente com as seguintes regras:
    *   Dados dois elementos diferentes high e low de um array, de modo que high tenha um índice maior que low, se um ponteiro aponta para high (ou um subobjeto de high) e o outro ponteiro aponta para low (ou um subobjeto de low), o primeiro se compara como maior que o último.
    *   Se um ponteiro aponta para um elemento elem (ou para um subobjeto de elem) de um array, e o outro ponteiro está após o final do mesmo array, o ponteiro após o final se compara como maior que o outro ponteiro.
    *   Se um ponteiro aponta para um objeto completo, um subobjeto de classe base ou um subobjeto membro obj (ou para um subobjeto de obj), e o outro ponteiro está após o final de obj, o ponteiro após o final se compara como maior que o outro ponteiro.
    *   Se os ponteiros apontam para diferentes membros de dados não-estáticos [de tamanho não-zero](<#/doc/language/attributes/no_unique_address>)(desde C++20) com o mesmo [acesso de membro](<#/doc/language/access>)(ate C++23) do mesmo objeto de um tipo de classe não-union, ou para subobjetos de tais membros, recursivamente, o ponteiro para o membro declarado posteriormente se compara como maior que o outro ponteiro.
*   Caso contrário, o resultado é não especificado.

#### Ordem total de ponteiros

Existe uma _ordem total estrita definida pela implementação sobre ponteiros_ em cada programa. A ordem total estrita é consistente com a ordem parcial descrita acima: resultados não especificados tornam-se definidos pela implementação, enquanto outros resultados permanecem os mesmos.

A comparação de ponteiros com a ordem total estrita é aplicada nos seguintes casos:

*   Chamando o operator() das especializações do tipo ponteiro de [std::less](<#/doc/utility/functional/less>), [std::greater](<#/doc/utility/functional/greater>), [std::less_equal](<#/doc/utility/functional/less_equal>) e [std::greater_equal](<#/doc/utility/functional/greater_equal>).
*   Chamando operadores embutidos que comparam ponteiros do operator() das especializações [`std::less<void>`](<#/doc/utility/functional/less_void>), [`std::greater<void>`](<#/doc/utility/functional/greater_void>), [`std::less_equal<void>`](<#/doc/utility/functional/less_equal_void>) e [`std::greater_equal<void>`](<#/doc/utility/functional/greater_equal_void>).

| (desde C++14)

*   Chamando o operator<=> embutido que compara ponteiros do operator() de [std::compare_three_way](<#/doc/utility/compare/compare_three_way>).
*   Chamando o operator== embutido que compara ponteiros do operator() de [`std::ranges::equal_to`](<#/doc/utility/functional/ranges/equal_to>) e [`std::ranges::not_equal_to`](<#/doc/utility/functional/ranges/not_equal_to>).
*   Chamando o operator< embutido que compara ponteiros do operator() de [`std::ranges::less`](<#/doc/utility/functional/ranges/less>), [`std::ranges::greater`](<#/doc/utility/functional/ranges/greater>), [`std::ranges::less_equal`](<#/doc/utility/functional/ranges/less_equal>) e [`std::ranges::greater_equal`](<#/doc/utility/functional/ranges/greater_equal>).

| (desde C++20)

#### Sobrecargas

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada par de tipos aritméticos promovidos `L` e `R`, incluindo tipos de enumeração, as seguintes assinaturas de função participam da resolução de sobrecarga:

bool operator<(L, R);
bool operator>(L, R);
bool operator<=(L, R);
bool operator>=(L, R);
bool operator==(L, R);
bool operator!=(L, R);

Para cada tipo `P` que é um ponteiro para objeto ou ponteiro para função, as seguintes assinaturas de função participam da resolução de sobrecarga:

bool operator<(P, P);
bool operator>(P, P);
bool operator<=(P, P);
bool operator>=(P, P);
bool operator==(P, P);
bool operator!=(P, P);

Para cada tipo `MP` que é um ponteiro para objeto membro ou ponteiro para função membro ou [std::nullptr_t](<#/doc/types/nullptr_t>)(desde C++11), as seguintes assinaturas de função participam da resolução de sobrecarga:

bool operator==(MP, MP);
bool operator!=(MP, MP);

Run this code
```cpp
    #include <iostream>
    
    struct Foo
    {
        int n1;
        int n2;
    };
    
    union Union
    {
        int n;
        double d;
    };
    
    int main()
    {
        std::cout << std::boolalpha;
    
        char a[4] = "abc";
        char* p1 = &a[1];
        char* p2 = &a[2];
        std::cout << "Pointers to array elements:\n"
                  << "p1 == p2? " << (p1 == p2) << '\n'
                  << "p1 <  p2? " << (p1 <  p2) << '\n';
    
        Foo f;
        int* p3 = &f.n1;
        int* p4 = &f.n2;
        std::cout << "Pointers to members of a class:\n"
                  << "p3 == p4? " << (p3 == p4) << '\n'
                  << "p3 <  p4? " << (p3 <  p4) << '\n';
    
        Union u;
        int* p5 = &u.n;
        double* p6 = &u.d;
        std::cout << "Pointers to members of a union:\n"
                  << "p5 == (void*)p6? " << (p5 == (void*)p6) << '\n'
                  << "p5 <  (void*)p6? " << (p5 <  (void*)p6) << '\n';
    }
```

Output:
```
    Pointers to array elements:
    p1 == p2? false
    p1 <  p2? true
    Pointers to members of a class:
    p3 == p4? false
    p3 <  p4? true
    Pointers to members of a union:
    p5 == (void*)p6? true
    p5 <  (void*)p6? false
```

### Comparação de três vias

As expressões de operador de comparação de três vias têm a forma
---
a `< =>` b

A expressão retorna um objeto tal que

*   `(a <=> b) < 0` se `a < b`,
*   `(a <=> b) > 0` se `a > b`,
*   `(a <=> b) == 0` se `a` e `b` são iguais/equivalentes.

Se um dos operandos for do tipo bool e o outro não, o programa é malformado.

Se ambos os operandos tiverem tipos aritméticos, ou se um operando tiver tipo de enumeração sem escopo e o outro tiver tipo integral, as conversões aritméticas usuais são aplicadas aos operandos, e então

*   Se uma conversão de estreitamento for necessária, diferente de um tipo integral para um tipo de ponto flutuante, o programa é malformado.
*   Caso contrário, se os operandos tiverem tipo integral, o operador produz um prvalue do tipo [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>):
    *   `std::strong_ordering::equal` se ambos os operandos são aritmeticamente iguais,
    *   `std::strong_ordering::less` se o primeiro operando é aritmeticamente menor que o segundo,
    *   `std::strong_ordering::greater` caso contrário.
*   Caso contrário, os operandos têm tipo de ponto flutuante, e o operador produz um prvalue do tipo [`std::partial_ordering`](<#/doc/utility/compare/partial_ordering>). A expressão `a <=> b` produz
    *   `std::partial_ordering::less` se `a` é menor que `b`,
    *   `std::partial_ordering::greater` se `a` é maior que `b`,
    *   `std::partial_ordering::equivalent` se `a` é equivalente a `b` (`-0 <=> +0` é equivalente),
    *   `std::partial_ordering::unordered` (`NaN <=> qualquer coisa` é não ordenada).

Se ambos os operandos tiverem o mesmo tipo de enumeração `E`, o operador produz o resultado da conversão dos operandos para o tipo subjacente de `E` e aplicando `<=>` aos operandos convertidos.

Se pelo menos um dos operandos for um ponteiro para objeto ou ponteiro para membro, [conversões de array para ponteiro](<#/doc/language/implicit_cast>), [conversões de ponteiro](<#/doc/language/implicit_cast>) e [conversões de qualificação](<#/doc/language/implicit_cast>) são aplicadas a ambos os operandos para levá-los ao seu [tipo de ponteiro composto](<#/doc/language/pointer>).

Para operandos ponteiro convertidos `p` e `q`, `p <=> q` retorna um prvalue do tipo [`std::strong_ordering`](<#/doc/utility/compare/strong_ordering>):

*   `std::strong_ordering::equal` se eles [se comparam como iguais](<#/doc/language/operator_comparison>),
*   `std::strong_ordering::less` se `q` [se compara como maior que](<#/doc/language/operator_comparison>) `p`,
*   `std::strong_ordering::greater` se `p` se compara como maior que `q`,
*   resultado não especificado se o resultado da comparação de duas vias é não especificado.

Caso contrário, o programa é malformado.

#### Sobrecargas

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para tipo ponteiro ou de enumeração `T`, a seguinte assinatura de função participa da resolução de sobrecarga:

R operator<=>(T, T);

Onde `R` é o tipo de categoria de ordenação definido acima.

Run this code
```cpp
    #include <compare>
    #include <iostream>
    
    int main()
    {
        double foo = -0.0;
        double bar = 0.0;
    
        auto res = foo <=> bar;
    
        if (res < 0)
            std::cout << "-0 is less than 0";
        else if (res > 0)
            std::cout << "-0 is greater than 0";
        else if (res == 0)
            std::cout << "-0 and 0 are equal";
        else
            std::cout << "-0 and 0 are unordered";
    }
```

Output:
```
    -0 and 0 are equal
```

(desde C++20)

### Notas

Como os operadores de comparação agrupam da esquerda para a direita, a expressão `a < b < c` é analisada como `(a < b) < c`, e não `a < (b < c)` ou `(a < b) && (b < c)`.

Run this code
```cpp
    #include <iostream>
    
    int main()
    {
        int a = 3, b = 2, c = 1;
    
        std::cout << std::boolalpha
            << (a < b < c) << '\n' // true; maybe warning
            << ((a < b) < c) << '\n' // true
            << (a < (b < c)) << '\n' // false
            << ((a < b) && (b < c)) << '\n'; // false
    }
```

Um requisito comum para [operator< definido pelo usuário](<#/doc/language/operators>) é a [ordenação fraca estrita](<https://en.wikipedia.org/wiki/Strict_weak_ordering> "enwiki:Strict weak ordering"). Em particular, isso é exigido pelos algoritmos e containers padrão que trabalham com tipos [Compare](<#/doc/named_req/Compare>): [std::sort](<#/doc/algorithm/sort>), [std::max_element](<#/doc/algorithm/max_element>), [std::map](<#/doc/container/map>), etc.

O [resultado da comparação](<#/doc/language/operator_comparison>) de ponteiros para diferentes membros de dados não-estáticos da mesma classe implica que os membros de dados não-estáticos em cada um dos três [modos de acesso de membro](<#/doc/language/access>)(ate C++23) são posicionados na memória na ordem de declaração.

Embora os resultados da comparação de ponteiros de origem aleatória (por exemplo, nem todos apontando para membros do mesmo array) sejam não especificados, muitas implementações fornecem [ordenação total estrita](<https://en.wikipedia.org/wiki/Total_order#Strict_total_order> "enwiki:Total order") de ponteiros, por exemplo, se eles são implementados como endereços dentro de um espaço de endereço virtual contínuo. Aquelas implementações que não o fazem (por exemplo, onde nem todos os bits do ponteiro fazem parte de um endereço de memória e precisam ser ignorados para comparação, ou um cálculo adicional é necessário ou, de outra forma, ponteiro e inteiro não têm uma relação de 1 para 1), fornecem uma especialização de [std::less](<#/doc/utility/functional/less>) para ponteiros que tem essa garantia. Isso torna possível usar todos os ponteiros de origem aleatória como chaves em containers associativos padrão como [std::set](<#/doc/container/set>) ou [std::map](<#/doc/container/map>).

Para os tipos que são tanto [EqualityComparable](<#/doc/named_req/EqualityComparable>) quanto [LessThanComparable](<#/doc/named_req/LessThanComparable>), a standard library C++ faz uma distinção entre _igualdade_, que é o valor da expressão `a == b`, e _equivalência_, que é o valor da expressão `!(a < b) && !(b < a)`.

A comparação entre ponteiros e constantes de ponteiro nulo foi removida pela resolução do [problema CWG 583](<https://cplusplus.github.io/CWG/issues/583.html>) incluída em [N3624](<https://wg21.link/N3624>):

Run this code
```cpp
    void f(char* p)
    {
        if (p > 0) { /*...*/ } // Error with N3624, compiled before N3624
        if (p > nullptr) { /*...*/ } // Error with N3624, compiled before N3624
    }
    
    int main() {}
```

A comparação de três vias pode ser gerada automaticamente para tipos de classe, veja [comparações padrão](<#/doc/language/default_comparisons>).

Se ambos os operandos forem arrays, a comparação de três vias é malformada.
```cpp
    unsigned int i = 1;
    auto r = -1 < i;    // existing pitfall: returns ‘false’
    auto r2 = -1 <=> i; // Error: narrowing conversion required
```

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_impl_three_way_comparison`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | Comparação de três vias (suporte do compilador)
[`__cpp_lib_three_way_comparison`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | Comparação de três vias (suporte da biblioteca); adicionando comparação de três vias à biblioteca

### Standard library

Operadores de comparação são sobrecarregados para muitas classes na standard library.

[ operator==operator!=](<#/doc/types/type_info/operator_cmp>)(removido em C++20) | verifica se os objetos se referem ao mesmo tipo
(função membro pública de `std::type_info`)
[ operator==operator!=operator<operator<=>](<#/doc/error/error_code/operator_cmp>)(removido em C++20)(removido em C++20)(C++20) | compara dois `error_code`s
(função)
[ operator==operator!=operator<operator<=>](<#/doc/error/error_condition/operator_cmp>)(removido em C++20)(removido em C++20)(C++20) | compara `error_condition`s e `error_code`s
(função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/pair/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores no `pair`
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/utility/tuple/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores no tuple
(template de função)
[ operator==operator!=](<#/doc/utility/bitset/operator_cmp>)(removido em C++20) | compara o conteúdo
(função membro pública de `std::bitset<N>`)
[ operator==operator!=](<#/doc/memory/allocator/operator_cmp>)(removido em C++20) | compara duas instâncias de `allocator`
(função membro pública de `std::allocator<T>`)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/memory/unique_ptr/operator_cmp>)(removido em C++20)(C++20) | compara com outro `unique_ptr` ou com nullptr
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/memory/shared_ptr/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara com outro `shared_ptr` ou com nullptr
(template de função)
[ operator==operator!=](<#/doc/utility/functional/function/operator_cmp>)(removido em C++20) | compara uma [std::function](<#/doc/utility/functional/function>) com nullptr
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/chrono/duration/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(C++11)(C++11)(C++11)(C++20) | compara duas durations
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/chrono/time_point/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(C++11)(C++11)(C++11)(C++20) | compara dois time points
(template de função)
[ operator==operator!=](<#/doc/memory/scoped_allocator_adaptor/operator_cmp>)(removido em C++20) | compara dois objetos `scoped_allocator_adaptor`
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/types/type_index/operator_cmp>)(removido em C++20)(C++20) | compara os objetos [std::type_info](<#/doc/types/type_info>) subjacentes
(função membro pública de `std::type_index`)
[ operator==operator!=operator&lt;operator&gt;operator<=operator>=operator<=>](<#/doc/string/basic_string/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente duas strings
(template de função)
[ operator==operator!=](<#/doc/locale/locale/operator_cmp>)(removido em C++20) | comparação de igualdade entre objetos locale
(função membro pública de `std::locale`)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/array/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `array`s
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/deque/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `deque`s
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/forward_list/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++11)(removido em C++20)(C++20) | compara lexicograficamente os valores de duas `forward_list`s
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/list/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de duas `list`s
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/vector/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `vector`s
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/map/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `map`s
(modelo de função)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/multimap/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `multimap`s   
(modelo de função)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/set/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `set`s   
(modelo de função)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/multiset/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara lexicograficamente os valores de dois `multiset`s   
(modelo de função)  
[ operator==operator!=](<#/doc/container/unordered_map/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os valores no unordered_map   
(modelo de função)  
[ operator==operator!=](<#/doc/container/unordered_multimap/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os valores no unordered_multimap   
(modelo de função)  
[ operator==operator!=](<#/doc/container/unordered_set/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os valores no unordered_set   
(modelo de função)  
[ operator==operator!=](<#/doc/container/unordered_multiset/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os valores no unordered_multiset   
(modelo de função)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/queue/operator_cmp>)(C++20) | compara lexicograficamente os valores de duas `queue`s   
(modelo de função)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/container/stack/operator_cmp>)(C++20) | compara lexicograficamente os valores de duas `stack`s   
(modelo de função)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/iterator/reverse_iterator/operator_cmp>)(C++20) | compara os iterators subjacentes   
(modelo de função)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/iterator/move_iterator/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(C++11)(C++11)(C++11)(C++20) | compara os iterators subjacentes   
(modelo de função)  
[ operator==operator!=](<#/doc/iterator/istream_iterator/operator_cmp>)(removido em C++20) | compara dois `istream_iterator`s   
(modelo de função)  
[ operator==operator!=](<#/doc/iterator/istreambuf_iterator/operator_cmp>)(removido em C++20) | compara dois `istreambuf_iterator`s   
(modelo de função)  
[ operator==operator!=](<#/doc/numeric/complex/operator_cmp>)(removido em C++20) | compara dois números complexos ou um complexo e um escalar   
(modelo de função)  
[ operator==operator!=operator<operator<=operator>operator>=](<#/doc/numeric/valarray/operator_cmp>) | compara dois valarrays ou um valarray com um valor   
(modelo de função)  
[ operator==operator!=](<#/doc/numeric/random/linear_congruential_engine/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os estados internos de dois motores de números pseudoaleatórios   
(função)  
[ operator==operator!=](<#/doc/numeric/random/poisson_distribution/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara dois objetos de distribuição   
(função)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/regex/sub_match/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara um `sub_match` com outro `sub_match`, uma string, ou um caractere   
(modelo de função)  
[ operator==operator!=](<#/doc/regex/match_results/operator_cmp>)(removido em C++20) | compara lexicograficamente os valores nos dois resultados de correspondência   
(modelo de função)  
[ operator==operator!=](<#/doc/regex/regex_iterator/operator_cmp>)(removido em C++20) | compara dois `regex_iterator`s   
(função membro pública de `std::regex_iterator<BidirIt,CharT,Traits>`)  
[ operator==operator!=](<#/doc/regex/regex_token_iterator/operator_cmp>)(removido em C++20) | compara dois `regex_token_iterator`s   
(função membro pública de `std::regex_token_iterator<BidirIt,CharT,Traits>`)  
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/thread/thread/id/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara dois objetos `thread::id`   
(função)  
  
O namespace [`std::rel_ops`](<#/doc/utility/rel_ops/operator_cmp>) fornece operadores genéricos !=, >, <= e >=: 

Definido no header `[<utility>](<#/doc/header/utility>)`  
---  
Definido no namespace `std::rel_ops`  

```cpp
 operator!=operator>operator<=operator>=(obsoleto em C++20)
(modelo de função)
```

  
### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[CWG 583](<https://cplusplus.github.io/CWG/issues/583.html>)  
([N3624](<https://wg21.link/N3624>))  | C++98  | todos os seis operadores de comparação poderiam ser usados para  
comparar um ponteiro com uma constante de ponteiro nulo  | apenas operadores de igualdade  
são permitidos   
[CWG 661](<https://cplusplus.github.io/CWG/issues/661.html>) | C++98  | a semântica real das comparações aritméticas (por exemplo,
---|---|---
se 1 < 2 resulta em verdadeiro ou falso) era não especificada  | especificação adicionada   
[CWG 879](<https://cplusplus.github.io/CWG/issues/879.html>) | C++98  | ponteiros para tipos de função e ponteiros  
para void não tinham comparações embutidas  | especificação de comparação adicionada  
para esses ponteiros   
[CWG 1596](<https://cplusplus.github.io/CWG/issues/1596.html>) | C++98  | objetos não-array eram considerados pertencentes a arrays com  
apenas um elemento para fins de aritmética de ponteiros  | a regra também é  
aplicada à comparação   
[CWG 1598](<https://cplusplus.github.io/CWG/issues/1598.html>) | C++98  | dois ponteiros para membros de classes que são diferentes e  
nenhum é a classe base do outro não comparavam como iguais  
mesmo que os offsets dos membros apontados pudessem ser os mesmos  | o resultado é  
não especificado  
neste caso   
[CWG 1858](<https://cplusplus.github.io/CWG/issues/1858.html>) | C++98  | não estava claro se dois ponteiros para membros  
que se referem a membros diferentes da mesma union  
comparam como iguais como se se referissem ao mesmo membro  | eles comparam  
como iguais neste caso   
[CWG 2419](<https://cplusplus.github.io/CWG/issues/2419.html>) | C++98  | um ponteiro para um objeto não-array era tratado apenas como um  
ponteiro para o primeiro elemento de um array com tamanho 1  
na comparação de ponteiros se o ponteiro fosse obtido por `&` | aplica-se a todos os ponteiros  
para objetos não-array   
[CWG 2526](<https://cplusplus.github.io/CWG/issues/2526.html>) | C++98  | a definição de comparação relacional (`>`, `>=`, `<` e `<=`) de
---|---|---
ponteiros para void e ponteiros de função foi removida por [N3624](<https://wg21.link/N3624>) | restaurada   
[CWG 2796](<https://cplusplus.github.io/CWG/issues/2796.html>) | C++17  | conversões de ponteiro de função não eram realizadas nos operandos  
de ponteiro convertidos durante comparações relacionais de ponteiro embutidas  | realiza essas  
conversões neste caso   
  
### Veja também

  * [Precedência de operadores](<#/doc/language/operator_precedence>)
  * [Sobrecarga de operadores](<#/doc/language/operators>)
  * [Compare](<#/doc/named_req/Compare>) (requisitos nomeados) 

Operadores comuns   
---  
[atribuição](<#/doc/language/operator_assignment>) | [incremento  
---|---
decremento](<#/doc/language/operator_incdec>) | [aritméticos](<#/doc/language/operator_arithmetic>) | [lógicos](<#/doc/language/operator_logical>) | **comparação** | [acesso a  
membro](<#/doc/language/operator_member_access>) | [outros](<#/doc/language/operator_other>)  
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
a >>= b |  ++a  
\--a  
a++  
a\-- |  +a  
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
a >> b |  !a  
a && b  
a || b |  a == b  
a != b  
a < b  
a > b  
a <= b  
a >= b  
a <=> b |  a[...]  
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
[`static_cast`](<#/doc/language/static_cast>) converte um tipo para outro tipo relacionado  
[`dynamic_cast`](<#/doc/language/dynamic_cast>) converte dentro de hierarquias de herança  
[`const_cast`](<#/doc/language/const_cast>) adiciona ou remove qualificadores [cv](<#/doc/language/cv>)  
[`reinterpret_cast`](<#/doc/language/reinterpret_cast>) converte um tipo para um tipo não relacionado  
[C-style cast](<#/doc/language/explicit_cast>) converte um tipo para outro por uma mistura de static_cast, const_cast e reinterpret_cast  
[`new`](<#/doc/language/new>) cria objetos com duração de armazenamento dinâmica  
[`delete`](<#/doc/language/delete>) destrói objetos criados anteriormente pela expressão new e libera a área de memória obtida  
[`sizeof`](<#/doc/language/sizeof>) consulta o tamanho de um tipo  
[`sizeof...`](<#/doc/language/sizeof...>) consulta o tamanho de um [pack](<#/doc/language/parameter_pack>) (desde C++11)  
[`typeid`](<#/doc/language/typeid>) consulta as informações de tipo de um tipo  
[`noexcept`](<#/doc/language/noexcept>) verifica se uma expressão pode lançar uma exceção (desde C++11)  
[`alignof`](<#/doc/language/alignof>) consulta os requisitos de alinhamento de um tipo (desde C++11)  
[Documentação C](<#/>) para operadores de comparação  
---