# Operadores lógicos

Retorna o resultado de uma operação booleana.

Nome do operador | Sintaxe | [Sobrecarrégavel](<#/doc/language/operators>) | Exemplos de protótipo (para a classe T)
Dentro da definição da classe | Fora da definição da classe
negação | not a !a | Yes | bool T::operator!() const; | bool operator!(const T &a);
E | a and b a && b | Yes | bool T::operator&&(const T2 &b) const; | bool operator&&(const T &a, const T2 &b);
OU inclusivo | a or b a || b | Yes | bool T::operator||(const T2 &b) const; | bool operator||(const T &a, const T2 &b);

**Notas**

*   As formas semelhantes a palavras-chave (and,or,not) e as formas semelhantes a símbolos (&&,||,!) podem ser usadas de forma intercambiável (veja [representações alternativas](<#/doc/language/operator_alternative>)).
*   Todos os operadores embutidos retornam bool, e a maioria das [sobrecargas definidas pelo usuário](<#/doc/language/operators>) também retorna bool para que os operadores definidos pelo usuário possam ser usados da mesma maneira que os embutidos. No entanto, em uma sobrecarga de operador definida pelo usuário, qualquer tipo pode ser usado como tipo de retorno (incluindo void).
*   Os operadores embutidos `& &` e `||` realizam avaliação de curto-circuito (não avaliam o segundo operando se o resultado for conhecido após avaliar o primeiro), mas os operadores sobrecarregados se comportam como chamadas de função regulares e sempre avaliam ambos os operandos.

### Explicação

As expressões de operador lógico têm a forma

---
`!` rhs | (1) |
---|---|---
lhs `& &` rhs | (2) |
lhs `||` rhs | (3) |

1) NOT Lógico

2) AND Lógico

3) OR inclusivo Lógico

Se o operando não for bool, ele é convertido para bool usando [conversão contextual para bool](<#/doc/language/implicit_cast>): é bem-formado apenas se a declaração `bool t(arg)` for bem-formada, para algum temporário `t` inventado.

O resultado é um prvalue bool.

Para o operador NOT lógico embutido, o resultado é true se o operando for false. Caso contrário, o resultado é false.

Para o operador AND lógico embutido, o resultado é true se ambos os operandos forem true. Caso contrário, o resultado é false. Este operador é de [curto-circuito](<https://en.wikipedia.org/wiki/Short-circuit_evaluation> "enwiki:Short-circuit evaluation"): se o primeiro operando for false, o segundo operando não é avaliado.

Para o operador OR lógico embutido, o resultado é true se o primeiro ou o segundo operando (ou ambos) for true. Este operador é de curto-circuito: se o primeiro operando for true, o segundo operando não é avaliado.

Note que os [operadores lógicos bit a bit](<#/doc/language/operator_arithmetic>) não realizam curto-circuito.

### Resultados

a | true | false
!a | false | true
and | a
true | false
b | true | true | false
false | false | false
or | a
true | false
b | true | true | true
false | true | false

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), as seguintes assinaturas de função embutidas participam da resolução de sobrecarga:

bool operator!(bool)
bool operator&&(bool, bool)
bool operator||(bool, bool)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    #include <string>
    
    int main()
    {
        int n = 2;
        int* p = &n;
        // pointers are convertible to bool
        if (    p && *p == 2  // "*p" is safe to use after "p &&"
            || !p &&  n != 2) // || has lower precedence than &&
            std::cout << "true\n";
    
        // streams are also convertible to bool
        std::stringstream cin;
        cin << "3...\n" << "2...\n" << "1...\n" << "quit";
        std::cout << "Enter 'quit' to quit.\n";
        for (std::string line;    std::cout << "> "
                               && std::getline(cin, line)
                               && line != "quit";)
            std::cout << line << '\n';
    }
```

Saída:
```
    true
    Enter 'quit' to quit.
    > 3...
    > 2...
    > 1...
    >
```

### Standard library

Como as propriedades de curto-circuito de `operator&&` e `operator||` não se aplicam a sobrecargas, e como tipos com semântica booleana são incomuns, apenas duas classes da standard library sobrecarregam esses operadores:

```cpp
 operator! | aplica um operador aritmético unário a cada elemento do valarray
(função membro pública de `std::valarray<T>`)
 operator&&operator|| | aplica operadores binários a cada elemento de dois valarrays, ou um valarray e um valor
(template de função)
 operator! | verifica se ocorreu um erro (sinônimo de fail())
(função membro pública de `std::basic_ios<CharT,Traits>`)
```

### Veja também

[Precedência de operadores](<#/doc/language/operator_precedence>)

[Sobrecarga de operadores](<#/doc/language/operators>)

[ logical_and](<#/doc/utility/functional/logical_and>) | objeto de função que implementa x && y
---|---
(template de classe) |
[ logical_or](<#/doc/utility/functional/logical_or>) | objeto de função que implementa x || y
(template de classe) |
[ logical_not](<#/doc/utility/functional/logical_not>) | objeto de função que implementa !x
(template de classe) |
Operadores comuns
---
atribuição | incremento
---|---
decremento | aritméticos | **lógicos** | comparação | acesso a membro
| outros
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
[documentação C](<#/>) para operadores lógicos
---