# Operadores de atribuição

Operadores de atribuição modificam o valor do objeto.

Nome do operador | Sintaxe | [Sobrecarrégavel](<#/doc/language/operators>) | Exemplos de protótipo (para a classe T)
---|---|---|---|---
 | Dentro da definição da classe | Fora da definição da classe
atribuição simples | `a = b` | Sim | T& T::operator =(const T2& b); | N/A
atribuição de adição | `a += b` | Sim | T& T::operator +=(const T2& b); | T& operator +=(T& a, const T2& b);
atribuição de subtração | `a -= b` | Sim | T& T::operator -=(const T2& b); | T& operator -=(T& a, const T2& b);
atribuição de multiplicação | `a *= b` | Sim | T& T::operator *=(const T2& b); | T& operator *=(T& a, const T2& b);
atribuição de divisão | `a /= b` | Sim | T& T::operator /=(const T2& b); | T& operator /=(T& a, const T2& b);
atribuição de resto | `a %= b` | Sim | T& T::operator %=(const T2& b); | T& operator %=(T& a, const T2& b);
atribuição AND bit a bit | `a &= b` | Sim | T& T::operator &=(const T2& b); | T& operator &=(T& a, const T2& b);
atribuição OR bit a bit | `a |= b` | Sim | T& T::operator |=(const T2& b); | T& operator |=(T& a, const T2& b);
atribuição XOR bit a bit | `a ^= b` | Sim | T& T::operator ^=(const T2& b); | T& operator ^=(T& a, const T2& b);
atribuição de deslocamento à esquerda bit a bit | `a <<= b` | Sim | T& T::operator <<=(const T2& b); | T& operator <<=(T& a, const T2& b);
atribuição de deslocamento à direita bit a bit | `a >>= b` | Sim | T& T::operator >>=(const T2& b); | T& operator >>=(T& a, const T2& b);

**Notas**

*   Todos os operadores de atribuição embutidos retornam `*this`, e a maioria das [sobrecargas definidas pelo usuário](<#/doc/language/operators>) também retorna `*this` para que os operadores definidos pelo usuário possam ser usados da mesma maneira que os embutidos. No entanto, em uma sobrecarga de operador definida pelo usuário, qualquer tipo pode ser usado como tipo de retorno (incluindo `void`).
*   `T2` pode ser qualquer tipo, incluindo `T`.

### Definições

_Atribuição por cópia_ substitui o conteúdo do objeto `a` por uma cópia do conteúdo de `b` (`b` não é modificado). Para tipos de classe, isso é realizado em uma função membro especial, descrita em [operador de atribuição por cópia](<#/doc/language/as_operator>).

```cpp
_Atribuição por movimento_ substitui o conteúdo do objeto `a` pelo conteúdo de `b`, evitando a cópia se possível (`b` pode ser modificado). Para tipos de classe, isso é realizado em uma função membro especial, descrita em operador de atribuição por movimento.  // (desde C++11)
```

Para tipos não-classe, a atribuição por cópia e por movimento são indistinguíveis e são referidas como _atribuição direta_.

_Atribuição composta_ substitui o conteúdo do objeto `a` pelo resultado de uma operação binária entre o valor anterior de `a` e o valor de `b`.

### Sintaxe do operador de atribuição

As expressões de atribuição têm a forma

---
target-expr `=` new-value | (1) |
---|---|---
target-expr op new-value | (2) |
- **target-expr** — a expressão[1](<#/doc/language/operator_assignment>) a ser atribuída
- **op** — um de `*=`, `/=`, `%=`, `+=`, `-=`, `<<=`, `>>=`, `&=`, `^=`, `|=`
- **new-value** — a expressão[2](<#/doc/language/operator_assignment>)(até C++11)[cláusula inicializadora](<#/doc/language/initialization>)(desde C++11) para atribuir ao alvo

1.  [↑](<#/doc/language/operator_assignment>) `target-expr` deve ter [precedência](<#/doc/language/operator_precedence>) maior que uma expressão de atribuição.
2.  [↑](<#/doc/language/operator_assignment>) `new-value` não pode ser uma expressão de vírgula, porque sua [precedência](<#/doc/language/operator_precedence>) é menor.

1) Expressão de atribuição simples.

2) Expressão de atribuição composta.

Se `new-value` não for uma expressão, a expressão de atribuição nunca corresponderá a um operador de atribuição composta sobrecarregado. | (desde C++11)

### Operador de atribuição simples embutido

Para a atribuição simples embutida, `target-expr` deve ser um lvalue modificável.

O objeto referenciado por `target-expr` é modificado substituindo seu valor pelo resultado de `new-value`. Se o objeto referenciado for de um tipo inteiro `T`, e o resultado de `new-value` for do tipo inteiro assinado/não assinado correspondente, o valor do objeto é substituído pelo valor do tipo `T` com a mesma representação de valor do resultado de `new-value`.

O resultado de uma atribuição simples embutida é um lvalue do tipo de `target-expr`, referenciando `target-expr`. Se `target-expr` for um [bit-field](<#/doc/language/bit_field>), o resultado também é um bit-field.

#### Atribuição a partir de uma expressão

Se `new-value` for uma expressão, ela é [implicitamente convertida](<#/doc/language/implicit_cast>) para o tipo não-cv-qualificado de `target-expr`. Quando `target-expr` é um bit-field que não pode representar o valor da expressão, o valor resultante do bit-field é definido pela implementação.

Se `target-expr` e `new-value` identificarem objetos sobrepostos, o comportamento é indefinido (a menos que a sobreposição seja exata e o tipo seja o mesmo).

Se o tipo de `target-expr` for volatile-qualified, a atribuição é depreciada, a menos que a expressão de atribuição (possivelmente entre parênteses) seja uma [expressão de valor descartado](<#/doc/language/expressions>) ou um [operando não avaliado](<#/doc/language/expressions>). | (desde C++20)

#### Atribuição a partir de uma cláusula inicializadora não-expressão

`new-value` só é permitido não ser uma expressão nas seguintes situações:

*   `target-expr` é de um [tipo escalar](<#/doc/named_req/ScalarType>) `T`, e `new-value` está vazio ou tem apenas um elemento. Neste caso, dada uma variável inventada `t` declarada e inicializada como `T t = new-value`, o significado de `x = new-value` é `x = t`.
*   `target-expr` é de um tipo de classe. Neste caso, `new-value` é passado como argumento para a função do operador de atribuição selecionada pela [resolução de sobrecarga](<#/doc/language/overload_resolution>).

```cpp
    #include <complex>
    
    std::complex<double> z;
    z = {1, 2};  // meaning z.operator=({1, 2})
    z += {1, 2}; // meaning z.operator+=({1, 2})
    
    int a, b;
    a = b = {1}; // meaning a = b = 1;
    a = {1} = b; // syntax error
```

| (desde C++11)

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada tipo `T`, as seguintes assinaturas de função participam da resolução de sobrecarga:

T*& operator=(T*&, T*);
T*volatile & operator=(T*volatile &, T*);

Para cada enumeração ou ponteiro para tipo membro `T`, opcionalmente volatile-qualified, a seguinte assinatura de função participa da resolução de sobrecarga:

T& operator=(T&, T);

Para cada par `A1` e `A2`, onde `A1` é um tipo aritmético (opcionalmente volatile-qualified) e `A2` é um tipo aritmético promovido, a seguinte assinatura de função participa da resolução de sobrecarga:

A1& operator=(A1&, A2);

### Operador de atribuição composta embutido

O comportamento de cada expressão de atribuição composta embutida `target-expr _op_ = new-value` é exatamente o mesmo que o comportamento da expressão `target-expr = target-expr _op_ new-value`, exceto que `target-expr` é avaliado apenas uma vez.

Os requisitos para `target-expr` e `new-value` dos operadores de atribuição simples embutidos também se aplicam. Além disso:

*   Para `+=` e `-=`, o tipo de `target-expr` deve ser um [tipo aritmético](<#/doc/language/type-id>) ou um ponteiro para um [tipo de objeto](<#/doc/language/type-id>) completamente definido (possivelmente cv-qualified).
*   Para todos os outros operadores de atribuição composta, o tipo de `target-expr` deve ser um tipo aritmético.

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada par `A1` e `A2`, onde `A1` é um tipo aritmético (opcionalmente volatile-qualified) e `A2` é um tipo aritmético promovido, as seguintes assinaturas de função participam da resolução de sobrecarga:

A1& operator*=(A1&, A2);
A1& operator/=(A1&, A2);
A1& operator+=(A1&, A2);
A1& operator-=(A1&, A2);

Para cada par `I1` e `I2`, onde `I1` é um tipo integral (opcionalmente volatile-qualified) e `I2` é um tipo integral promovido, as seguintes assinaturas de função participam da resolução de sobrecarga:

I1& operator%=(I1&, I2);
I1& operator<<=(I1&, I2);
I1& operator>>=(I1&, I2);
I1& operator&=(I1&, I2);
I1& operator^=(I1&, I2);
I1& operator|=(I1&, I2);

Para cada tipo de objeto `T` opcionalmente cv-qualified, as seguintes assinaturas de função participam da resolução de sobrecarga:

T*& operator+=(T*&, std::ptrdiff_t);
T*& operator-=(T*&, std::ptrdiff_t);
T*volatile & operator+=(T*volatile &, std::ptrdiff_t);
T*volatile & operator-=(T*volatile &, std::ptrdiff_t);

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    int main()
    {
        int n = 0;        // not an assignment
    
        n = 1;            // direct assignment
        std::cout << n << ' ';
    
        n = {};           // zero-initialization, then assignment
        std::cout << n << ' ';
    
        n = 'a';          // integral promotion, then assignment
        std::cout << n << ' ';
    
        n = {'b'};        // explicit cast, then assignment
        std::cout << n << ' ';
    
        n = 1.0;          // floating-point conversion, then assignment
        std::cout << n << ' ';
    
    //  n = {1.0};        // compiler error (narrowing conversion)
    
        int& r = n;       // not an assignment
        r = 2;            // assignment through reference
        std::cout << n << ' ';
    
        int* p;
        p = &n;           // direct assignment
        p = nullptr;      // null-pointer conversion, then assignment
        std::cout << p << ' ';
    
        struct { int a; std::string s; } obj;
        obj = {1, "abc"}; // assignment from a braced-init-list
        std::cout << obj.a << ':' << obj.s << '\n';
    }
```

Saída possível:
```
    1 0 97 98 1 2 (nil) 1:abc
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 1527](<https://cplusplus.github.io/CWG/issues/1527.html>) | C++11 | para atribuições a objetos de tipo de classe, o operando direito poderia ser uma lista inicializadora apenas quando a atribuição fosse definida por um operador de atribuição definido pelo usuário | restrição de atribuição definida pelo usuário removida
[CWG 1538](<https://cplusplus.github.io/CWG/issues/1538.html>) | C++11 | `E1 = {E2}` era equivalente a `E1 = T(E2)` (`T` é o tipo de `E1`), isso introduziu um cast no estilo C | é equivalente a `E1 = T{E2}`
[CWG 2654](<https://cplusplus.github.io/CWG/issues/2654.html>) | C++20 | operadores de atribuição composta para tipos volatile-qualified foram depreciados de forma inconsistente | nenhum deles é depreciado
[CWG 2768](<https://cplusplus.github.io/CWG/issues/2768.html>) | C++11 | uma atribuição de uma cláusula inicializadora não-expressão para um valor escalar realizaria direct-list-initialization | realiza copy-list-initialization em vez disso
[CWG 2901](<https://cplusplus.github.io/CWG/issues/2901.html>) | C++98 | o valor atribuído a um objeto `unsigned int` através de um lvalue `int` é incerto | esclarecido
[P2327R1](<https://wg21.link/P2327R1>) | C++20 | operadores de atribuição composta bit a bit para tipos volatile foram depreciados, embora úteis para algumas plataformas | eles não são depreciados

### Veja também

[Precedência de operadores](<#/doc/language/operator_precedence>)

[Sobrecarga de operadores](<#/doc/language/operators>)

Operadores comuns
---
**atribuição** | [incremento decremento](<#/doc/language/operator_incdec>) | [aritméticos](<#/doc/language/operator_arithmetic>) | [lógicos](<#/doc/language/operator_logical>) | [de comparação](<#/doc/language/operator_comparison>) | [acesso a membro](<#/doc/language/operator_member_access>) | [outros](<#/doc/language/operator_other>)
`a = b`
`a += b`
`a -= b`
`a *= b`
`a /= b`
`a %= b`
`a &= b`
`a |= b`
`a ^= b`
`a <<= b`
`a >>= b` | `++a`
`--a`
`a++`
`a--` | `+a`
`-a`
`a + b`
`a - b`
`a * b`
`a / b`
`a % b`
`~a`
`a & b`
`a | b`
`a ^ b`
`a << b`
`a >> b` | `!a`
`a && b`
`a || b` | `a == b`
`a != b`
`a < b`
`a > b`
`a <= b`
`a >= b`
`a <=> b` | `a[...]`
`*a`
`&a`
`a->b`
`a.b`
`a->*b`
`a.*b` | chamada de função

`a(...)`
vírgula

`a, b`
condicional

`a ? b : c`
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
[documentação C](<#/>) para Operadores de atribuição
---