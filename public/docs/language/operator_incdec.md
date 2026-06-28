# Operadores de incremento/decremento

Operadores de incremento/decremento incrementam ou decrementam o valor do objeto.

Nome do operador | Sintaxe | [Sobrecaregável](<#/doc/language/operators>) | Exemplos de protótipo (para a classe T)
---|---|---|---|---
Dentro da definição da classe | Fora da definição da classe
pre-increment | `++a` | Sim | T& T::operator++(); | T& operator++(T& a);
pre-decrement | `--a` | Sim | T& T::operator\--(); | T& operator\--(T& a);
post-increment | `a++` | Sim | T T::operator++(int); | T operator++(T& a, int);
post-decrement | `a--` | Sim | T T::operator\--(int); | T operator\--(T& a, int);

**Notas**

*   As versões prefixadas dos operadores embutidos retornam _referências_ e as versões posfixadas retornam _valores_, e as [sobrecargas definidas pelo usuário](<#/doc/language/operators>) típicas seguem o padrão para que os operadores definidos pelo usuário possam ser usados da mesma maneira que os embutidos. No entanto, em uma sobrecarga de operador definida pelo usuário, qualquer tipo pode ser usado como tipo de retorno (incluindo void).
*   O parâmetro int é um parâmetro dummy (fictício) usado para diferenciar entre as versões prefixadas e posfixadas dos operadores. Quando o operador posfixado definido pelo usuário é chamado, o valor passado nesse parâmetro é sempre zero, embora possa ser alterado chamando o operador usando a notação de chamada de função (por exemplo, a.operator++(2) ou operator++(a, 2)).

### Operadores prefixados

As expressões de incremento e decremento prefixados têm a forma

---
`++` expressão
`--` expressão

1) incremento prefixado (pré-incremento)

2) decremento prefixado (pré-decremento)

#### Operadores prefixados embutidos

1) A expressão ++x é equivalente a x += 1, com as seguintes exceções:

*   Se o tipo da expressão for bool (possivelmente qualificado com volatile), a expressão é definida como true. Tal incremento é obsoleto.

| (até C++17)

*   Se o tipo da expressão for bool (possivelmente qualificado com cv), o programa é malformado.

| (desde C++17)

*   Se o tipo da expressão for qualificado com volatile, o incremento é obsoleto.

| (desde C++20)

2) A expressão --x é equivalente a x -= 1, com as seguintes exceções:

*   Se o tipo da expressão for bool (possivelmente qualificado com cv), o programa é malformado.

*   Se o tipo da expressão for qualificado com volatile, o decremento é obsoleto.

| (desde C++20)

#### Sobrecargas

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada tipo aritmético `A` opcionalmente qualificado com volatile, exceto bool, e para cada ponteiro `P` opcionalmente qualificado com volatile para um tipo de objeto opcionalmente qualificado com cv, as seguintes assinaturas de função participam da resolução de sobrecarga:

A& operator++(A&)
bool& operator++(bool&) | | (obsoleto)(até C++17)
P& operator++(P&)
A& operator\--(A&)
P& operator\--(P&)

### Operadores posfixados

As expressões de incremento e decremento posfixados têm a forma

---
expressão `++`
expressão `--`

1) incremento posfixado (pós-incremento)

2) decremento posfixado (pós-decremento)

#### Operadores posfixados embutidos

O resultado do incremento ou decremento posfixado é o valor obtido aplicando a [conversão de lvalue para rvalue](<#/doc/language/implicit_cast>) à expressão (antes da modificação). O tipo do resultado é a versão cv-não-qualificada do tipo da expressão.

Se a expressão não for um lvalue modificável de um tipo aritmético diferente de bool (possivelmente qualificado com cv) (desde C++17), ou um ponteiro para um tipo de objeto completo, o programa é malformado.

Se o tipo da expressão for qualificado com volatile, o incremento ou decremento é obsoleto. | (desde C++20)

1) O valor da expressão é modificado como se fosse o operando do operador prefixado `++`.

2) O valor da expressão é modificado como se fosse o operando do operador prefixado `--`.

A computação do valor de um incremento ou decremento posfixado é [sequenciada antes](<#/doc/language/eval_order>) da modificação da expressão. Em relação a uma chamada de função com sequência indeterminada, a operação de um incremento ou decremento posfixado é uma única avaliação.

#### Sobrecargas

Na [resolução de sobrecarga contra operadores definidos pelo usuário](<#/doc/language/overload_resolution>), para cada tipo aritmético `A` opcionalmente qualificado com volatile, exceto bool, e para cada ponteiro `P` opcionalmente qualificado com volatile para um tipo de objeto opcionalmente qualificado com cv, as seguintes assinaturas de função participam da resolução de sobrecarga:

A operator++(A&, int)
bool operator++(bool&, int) | | (obsoleto)(até C++17)
P operator++(P&, int)
A operator\--(A&, int)
P operator\--(P&, int)

#### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    int main()
    {
        int n1 = 1;
        int n2 = ++n1;
        int n3 = ++ ++n1;
        int n4 = n1++;
    //  int n5 = n1++ ++;   // error
    //  int n6 = n1 + ++n1; // undefined behavior
        std::cout << "n1 = " << n1 << '\n'
                  << "n2 = " << n2 << '\n'
                  << "n3 = " << n3 << '\n'
                  << "n4 = " << n4 << '\n';
    }
```

Saída:
```
    n1 = 5
    n2 = 2
    n3 = 4
    n4 = 4
```

### Notas

Devido aos efeitos colaterais envolvidos, os operadores de incremento e decremento embutidos devem ser usados com cuidado para evitar comportamento indefinido devido a violações das [regras de sequenciamento](<#/doc/language/eval_order>).

Como uma cópia temporária do objeto é construída durante o pós-incremento e pós-decremento, os operadores de pré-incremento ou pré-decremento são geralmente mais eficientes em contextos onde o valor retornado não é usado.

### Biblioteca padrão

Os operadores de incremento e decremento são sobrecarregados para muitos tipos da biblioteca padrão. Em particular, todo [LegacyIterator](<#/doc/named_req/Iterator>) sobrecarrega operator++ e todo [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>) sobrecarrega operator--, mesmo que esses operadores sejam no-ops para o iterador específico.

##### sobrecargas para tipos aritméticos

---
[ operator++operator++(int)operator--operator--(int)](<#/doc/atomic/atomic/operator_arith>) | incrementa ou decrementa o valor atômico em um
(função membro pública de `std::atomic<T>`)
[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/duration/operator_arith2>) | incrementa ou decrementa a contagem de ticks
(função membro pública de `std::chrono::duration<Rep,Period>`)

##### sobrecargas para tipos de iteradores

[ operator++operator++(int)](<#/doc/memory/raw_storage_iterator/operator_arith>) | avança o iterador
(função membro pública de `std::raw_storage_iterator<OutputIt,T>`)
[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/reverse_iterator/operator_arith>) | avança ou decrementa o iterador
(função membro pública de `std::reverse_iterator<Iter>`)
[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/move_iterator/operator_arith>)(C++11) | avança ou decrementa o iterador
(função membro pública de `std::move_iterator<Iter>`)
[ operator++operator++(int)](<#/>) | no-op
(função membro pública de `std::front_insert_iterator<Container>`)
[ operator++operator++(int)](<#/>) | no-op
(função membro pública de `std::back_insert_iterator<Container>`)
[ operator++operator++(int)](<#/>) | no-op
(função membro pública de `std::insert_iterator<Container>`)
[ operator++operator++(int)](<#/doc/iterator/istream_iterator/operator_arith>) | avança o iterador
(função membro pública de `std::istream_iterator<T,CharT,Traits,Distance>`)
[ operator++operator++(int)](<#/doc/iterator/ostream_iterator/operator_arith>) | no-op
(função membro pública de `std::ostream_iterator<T,CharT,Traits>`)
[ operator++operator++(int)](<#/doc/iterator/istreambuf_iterator/operator_arith>) | avança o iterador
(função membro pública de `std::istreambuf_iterator<CharT,Traits>`)
[ operator++operator++(int)](<#/doc/iterator/ostreambuf_iterator/operator_arith>) | no-op
(função membro pública de `std::ostreambuf_iterator<CharT,Traits>`)
[ operator++operator++(int)](<#/doc/regex/regex_iterator/operator_arith>) | avança o iterador para a próxima correspondência
(função membro pública de `std::regex_iterator<BidirIt,CharT,Traits>`)
[ operator++operator++(int)](<#/doc/regex/regex_token_iterator/operator_arith>) | avança o iterador para a próxima sub-correspondência
(função membro pública de `std::regex_token_iterator<BidirIt,CharT,Traits>`)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2855](<https://cplusplus.github.io/CWG/issues/2855.html>) | C++98 | conversões aritméticas usuais são aplicadas para pré-incremento e pré-decremento embutidos, mas não eram aplicadas para suas contrapartes posfixadas[1](<#/doc/language/operator_incdec>) | também aplicado
[CWG 2901](<https://cplusplus.github.io/CWG/issues/2901.html>) | C++98 | conversões de lvalue para rvalue não eram aplicadas para pós-incremento e pós-decremento embutidos | aplicado

1.  [↑](<#/doc/language/operator_incdec>) O prefixo ++x é equivalente a x += 1, e este último é aplicável para conversões aritméticas usuais (ou seja, resulta em um tipo comum entre decltype(x) e int). No entanto, o efeito do posfixo x++ é simplesmente "adicionar um a x", não há operador binário presente, então nenhuma conversão aritmética usual ocorrerá.

### Veja também

[Precedência de operadores](<#/doc/language/operator_precedence>)

[Sobrecarga de operadores](<#/doc/language/operators>)

Operadores comuns
---
[atribuição](<#/doc/language/operator_assignment>) | **incremento
decremento** | [aritméticos](<#/doc/language/operator_arithmetic>) | [lógicos](<#/doc/language/operator_logical>) | [comparação](<#/doc/language/operator_comparison>) | [acesso a membro](<#/doc/language/operator_member_access>) | [outros](<#/doc/language/operator_other>)
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
a.*b | function call

a(...)
comma

a, b
conditional

a ? b : c
Operadores especiais
[`static_cast`](<#/doc/language/static_cast>) converte um tipo para outro tipo relacionado
[`dynamic_cast`](<#/doc/language/dynamic_cast>) converte dentro de hierarquias de herança
[`const_cast`](<#/doc/language/const_cast>) adiciona ou remove qualificadores [cv](<#/doc/language/cv>)
[`reinterpret_cast`](<#/doc/language/reinterpret_cast>) converte tipo para tipo não relacionado
[C-style cast](<#/doc/language/explicit_cast>) converte um tipo para outro por uma mistura de static_cast, const_cast e reinterpret_cast
[`new`](<#/doc/language/new>) cria objetos com duração de armazenamento dinâmica
[`delete`](<#/doc/language/delete>) destrói objetos criados anteriormente pela expressão new e libera a área de memória obtida
[`sizeof`](<#/doc/language/sizeof>) consulta o tamanho de um tipo
[`sizeof...`](<#/doc/language/sizeof...>) consulta o tamanho de um [pack](<#/doc/language/parameter_pack>) (desde C++11)
[`typeid`](<#/doc/language/typeid>) consulta as informações de tipo de um tipo
[`noexcept`](<#/doc/language/noexcept>) verifica se uma expressão pode lançar uma exceção (desde C++11)
[`alignof`](<#/doc/language/alignof>) consulta os requisitos de alinhamento de um tipo (desde C++11)
[Documentação C](<#/>) para operadores de incremento/decremento
---
*   [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
*   [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão