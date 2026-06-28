# Outros operadores

Nome do operador | Sintaxe | [Sobrecarrregável](<#/doc/language/operators>) | Exemplos de protótipo (para a classe T)
---|---|---|---|---
 | Dentro da definição da classe | Fora da definição da classe
chamada de função | `a(a1, a2)` | Sim | R T::operator()(Arg1 &a1, Arg2 &a2, ...); | N/A
vírgula | `a, b` | Sim | T2& T::operator,(T2 &b); | T2& operator,(const T &a, T2 &b);
operador condicional | `a ? b : c` | Não | N/A | N/A

O operador de _chamada de função_ fornece semântica de função para qualquer objeto.

O _operador condicional_ (coloquialmente referido como _condicional ternário_) verifica o valor booleano da primeira expressão e, dependendo do valor resultante, avalia e retorna a segunda ou a terceira expressão.

### Operador de chamada de função embutido

Expressões de chamada de função têm a seguinte forma:

---
function `(` arg1`,` arg2`,` arg3`,`...`)`
- **function** — um tipo de função de expressão ou tipo de ponteiro para função
- **arg1`,` arg2`,` arg3`,`...** — uma lista possivelmente vazia de expressões arbitrárias ou [listas de inicializadores entre chaves](<#/doc/language/initialization>)(desde C++11), exceto que o operador vírgula não é permitido no nível superior para evitar ambiguidade

Para uma chamada a uma função não-membro ou a uma [função membro estática](<#/doc/language/static>), `function` pode ser um lvalue que se refere a uma função (caso em que a [conversão de função para ponteiro](<#/doc/language/implicit_cast>) é suprimida), ou um prvalue de tipo ponteiro para função.

O nome da função (ou membro) especificado por `function` pode ser sobrecarregado, sendo as regras de [resolução de sobrecarga](<#/doc/language/overload_resolution>) usadas para decidir qual sobrecarga deve ser chamada.

Se `function` especificar uma função membro, ela pode ser virtual, caso em que o final overrider dessa função será chamado, usando despacho dinâmico em tempo de execução.

Para chamar a função,

A expressão `function`, bem como todas as expressões `arg1`, `arg2`, `arg3`, etc., fornecidas como argumentos, são avaliadas em ordem arbitrária, [não sequenciadas](<#/doc/language/eval_order>) umas em relação às outras. | (até C++17)
---|---
`function` é sequenciada antes de cada um de `arg1`, `arg2`, `arg3`, bem como [argumentos padrão](<#/doc/language/default_arguments>), se houver. As expressões de argumento são avaliadas em ordem arbitrária, [sequenciadas indeterminadamente](<#/doc/language/eval_order>) umas em relação às outras. | (desde C++17)

Cada parâmetro de função é inicializado com seu argumento correspondente após [conversão implícita](<#/doc/language/implicit_cast>), se necessário.

  * Se não houver argumento correspondente, o [argumento padrão](<#/doc/language/default_arguments>) correspondente é usado, e se não houver nenhum, o programa é malformado.
  * Se a chamada for feita para uma função membro, então o ponteiro `this` para o objeto atual é convertido como se por um `cast` explícito para o ponteiro `this` esperado pela função.
  * A inicialização e destruição de cada parâmetro ocorre no contexto da [full-expression](<#/doc/language/expressions>) onde a chamada de função aparece, o que significa, por exemplo, que se um construtor ou destrutor de um parâmetro lançar uma exceção, os [blocos try de função](<#/doc/language/try>) da função chamada não são considerados.

Se a função for uma função variádica, as [promoções de argumento padrão](<#/doc/language/variadic_arguments>) são aplicadas a todos os argumentos correspondidos pelo parâmetro de reticências.

É definido pela implementação se um parâmetro é destruído quando a função na qual ele é definido termina ou no final da full-expression envolvente. Os parâmetros são sempre destruídos na ordem inversa de sua construção.

O tipo de retorno de uma expressão de chamada de função é o tipo de retorno da função escolhida, decidido usando ligação estática (ignorando a palavra-chave `virtual`), mesmo que a função sobrescritora que é realmente chamada retorne um tipo diferente. Isso permite que as funções sobrescritoras retornem ponteiros ou referências a classes que são derivadas do tipo de retorno retornado pela função base, ou seja, C++ suporta [tipos de retorno covariantes](<https://en.wikipedia.org/wiki/Covariant_return_type> "enwiki:Covariant return type"). Se `function` especificar um destrutor, o tipo de retorno é `void`.

Quando um objeto do tipo de classe `X` é passado para ou retornado de uma função, se cada construtor de cópia, construtor de movimento e destrutor de `X` for trivial ou deletado, e `X` tiver pelo menos um construtor de cópia ou movimento não deletado, as implementações são permitidas a criar um objeto temporário para armazenar o parâmetro da função ou o objeto de resultado. O objeto temporário é construído a partir do argumento da função ou do valor de retorno, respectivamente, e o parâmetro da função ou o objeto de retorno é inicializado como se usando o construtor trivial não deletado para copiar o temporário (mesmo que esse construtor seja inacessível ou não seria selecionado pela resolução de sobrecarga para realizar uma cópia ou movimento do objeto). Isso permite que objetos de tipos de classe pequenos, como [std::complex](<#/doc/numeric/complex>) ou `std::span`, sejam passados para ou retornados de funções em registradores. | (desde C++17)

A categoria de valor de uma expressão de chamada de função é lvalue se a função retorna uma referência lvalue ou uma referência rvalue para função, é um xvalue se a função retorna uma referência rvalue para objeto, e é um prvalue caso contrário. Se a expressão de chamada de função for um prvalue de tipo de objeto, ela deve ter [tipo completo](<#/doc/language/type-id>), exceto quando usada como operando de [`decltype`](<#/doc/language/decltype>) (ou como o operando direito de um [operador vírgula embutido](<#/doc/language/operator_other>) que é o operando de `decltype`)(desde C++11).

A expressão de chamada de função é sintaticamente semelhante à inicialização por valor `T()`, à expressão de [cast estilo função](<#/doc/language/explicit_cast>) `T(A1)`, e à inicialização direta de um temporário `T(A1, A2, A3, ...)`, onde `T` é o nome de um tipo.

Run this code
```cpp
    #include <cstdio>
    
    struct S
    {
        int f1(double d)
        {
            return printf("%f \n", d); // variable argument function call
        }
    
        int f2()
        {
            return f1(7); // member function call, same as this->f1()
                          // integer argument converted to double
        }
    };
    
    void f()
    {
        puts("function called"); // function call
    }
    
    int main()
    {
        f();    // function call
        S s;
        s.f2(); // member function call
    }
```

Output:
```
    function called
    7.000000
```

### Operador vírgula embutido

Expressões de vírgula têm a seguinte forma:

---
E1 `,` E2

Em uma expressão de vírgula `E1, E2`, a expressão `E1` é avaliada, seu resultado é [descartado](<#/doc/language/expressions>) (embora se tiver tipo de classe, não será destruído [até o final da full-expression que a contém](<#/doc/language/lifetime>)), e seus efeitos colaterais são concluídos antes que a avaliação da expressão `E2` comece (note que um `operator,` definido pelo usuário não pode garantir o sequenciamento)(até C++17).

O tipo, valor e categoria de valor do resultado da expressão de vírgula são exatamente o tipo, valor e categoria de valor do segundo operando, `E2`. Se `E2` for uma expressão temporária (desde C++17), o resultado da expressão é essa expressão temporária (desde C++17). Se `E2` for um bit-field, o resultado é um bit-field.

A vírgula em várias listas separadas por vírgulas, como listas de argumentos de função (`f(a, b, c)`) e listas de inicializadores (`int a[] = {1, 2, 3}`), não é o operador vírgula. Se o operador vírgula precisar ser usado em tais contextos, ele deve ser colocado entre parênteses: `f(a, (n++, n + b), c)`.

```cpp
Usar uma expressão de vírgula não parentesada como segundo (direito) argumento de um operador de subscrito é obsoleto. Por exemplo, `a[b, c]` é obsoleto e `a[(b, c)]` não é.  // (desde C++20)
(até C++23)
Uma expressão de vírgula não parentesada não pode ser o segundo (direito) argumento de um operador de subscrito. Por exemplo, `a[b, c]` é malformado ou equivalente a `a.operator`. Parênteses são necessários ao usar uma expressão de vírgula como subscrito, por exemplo, `a[(b, c)]`.  // (desde C++23)
```

Run this code
```cpp
    #include <iostream>
    
    int main()
    {
        // comma is often used to execute more than one expression
        // where the language grammar allows only one expression:
    
        // * in the third component of the for loop
        for (int i = 0, j = 10; i <= j; ++i, --j)
        //            ^list separator      ^comma operator
            std::cout << "i = " << i << " j = " << j << '\n';
    
        // * in a return statement
        // return log("an error!"), -1;
    
        // * in an initializer expression
        // MyClass(const Arg& arg)
        // : member{ throws_if_bad(arg), arg }
    
        // etc.
    
        // comma operators can be chained; the result of the last
        // (rightmost) expression is the result of the whole chain:
        int n = 1;
        int m = (++n, std::cout << "n = " << n << '\n', ++n, 2 * n);
    
        // m is now 6
        std::cout << "m = " << (++m, m) << '\n';
    }
```

Output:
```
    i = 0 j = 10
    i = 1 j = 9
    i = 2 j = 8
    i = 3 j = 7
    i = 4 j = 6
    i = 5 j = 5
    n = 2
    m = 7
```

### Operador condicional

As expressões do operador condicional têm a forma

---
E1 `?` E2 `:` E3

O primeiro operando do operador condicional é avaliado e [contextualmente convertido](<#/doc/language/implicit_cast>) para `bool`. Após a avaliação do valor e todos os efeitos colaterais do primeiro operando serem concluídos, se o resultado for `true`, o segundo operando é avaliado. Se o resultado for `false`, o terceiro operando é avaliado.

O tipo e a categoria de valor da expressão condicional `E1 ? E2 : E3` são determinados de acordo com as seguintes regras:

  * Se `E2` ou `E3` tiver tipo `void`:

    * Se ambos `E2` e `E3` forem do tipo `void`, o resultado é um prvalue do tipo `void`.
    * Caso contrário, se o operando do tipo `void` for uma [expressão throw](<#/doc/language/throw>) (possivelmente entre parênteses), o resultado tem o tipo e a categoria de valor da outra expressão. Se a outra expressão for um [bit-field](<#/doc/language/bit_field>), o resultado é um bit-field.[1](<#/doc/language/operator_other>)
    * Caso contrário, o programa é malformado.

```cpp
    2 + 2 == 4 ? throw 123 : throw 456;
    
    std::string str = 2 + 2 == 4 ? "OK" : throw std::logic_error("2 + 2 != 4");
```

  * Caso contrário, se `E2` ou `E3` forem bit-fields lvalue (até C++11) bit-fields glvalue da mesma categoria de valor (desde C++11) e dos tipos _cv1_ `T` e _cv2_ `T`, respectivamente, os operandos são considerados do tipo _cv_ `T` para o restante desta seção, onde `cv` é a união de _cv1_ e _cv2_.

  * Caso contrário, se `E2` e `E3` tiverem tipos diferentes, sendo pelo menos um deles um tipo de classe (possivelmente cv-qualificado), ou ambos forem lvalues (até C++11) glvalues da mesma categoria de valor (desde C++11) e tiverem o mesmo tipo, exceto pela qualificação cv, então uma tentativa é feita para formar uma [sequência de conversão implícita](<#/doc/language/implicit_cast>).[2](<#/doc/language/operator_other>)

     Tentativas são feitas para formar uma sequência de conversão implícita de uma expressão operando `X` do tipo `TX` para um _tipo alvo_ relacionado ao tipo `TY` da expressão operando `Y` da seguinte forma:

  * Se `Y` for um lvalue, o tipo alvo é `TY&`, mas uma sequência de conversão implícita só pode ser formada se a referência [se ligar diretamente](<#/doc/language/reference_initialization>) a um lvalue (até C++11) um glvalue (desde C++11).

    

  * Se `Y` for um xvalue, o tipo alvo é `TY&&`, mas uma sequência de conversão implícita só pode ser formada se a referência se ligar diretamente.

| (desde C++11)

    

  * Se `Y` for um rvalue (até C++11) um prvalue (desde C++11) ou se nenhuma das sequências de conversão acima puder ser formada, e pelo menos um de `TX` e `TY` for um tipo de classe (possivelmente cv-qualificado):

    

  * Se `TX` e `TY` forem do mesmo tipo de classe (ignorando a qualificação cv):

    

  * Se `TY` for pelo menos tão cv-qualificado quanto `TX`, o tipo alvo é `TY`.
  * Caso contrário, nenhuma sequência de conversão é formada.

  * Caso contrário, se `TY` for uma classe base de `TX`, o tipo alvo é `TY` com os cv-qualificadores de `TX`.
  * Caso contrário, o tipo alvo é o tipo de `Z`, onde `Z` é o valor de `Y` após aplicar as [conversões padrão](<#/doc/language/implicit_cast>) de lvalue para rvalue, array para ponteiro e função para ponteiro.

  * Caso contrário, nenhuma sequência de conversão é formada.

     Usando este processo, é determinado se uma sequência de conversão implícita pode ser formada de `E2` para o tipo alvo determinado para `E3`, e vice-versa.

  * Se ambas as sequências puderem ser formadas, ou uma puder ser formada, mas for a sequência de conversão ambígua, o programa é malformado.
  * Se nenhuma sequência de conversão puder ser formada, os operandos são deixados inalterados.
  * Caso contrário, se exatamente uma sequência de conversão puder ser formada, essa conversão é aplicada ao operando escolhido e o operando convertido é usado no lugar do operando original para o processo restante.

```cpp
    struct A {};
    
    struct B : A {};
    
    using T = const B;
    
    A a = true ? A() : T(); // Y = A(), TY = A, X = T(), TX = const B, Target = const A
```

  * Se `E2` e `E3` forem lvalues do mesmo tipo, então o resultado é um lvalue desse tipo, e é um bit-field se pelo menos um de `E2` e `E3` for um bit-field.

| (até C++11)

  * Se `E2` e `E3` forem glvalues do mesmo tipo e da mesma categoria de valor, então o resultado tem o mesmo tipo e categoria de valor, e é um bit-field se pelo menos um de `E2` e `E3` for um bit-field.

| (desde C++11)

  * Caso contrário, o resultado é um rvalue (até C++11) um prvalue (desde C++11).

    

  * Se `E2` e `E3` não tiverem o mesmo tipo, e um deles tiver tipo de classe (possivelmente cv-qualificado), a [resolução de sobrecarga](<#/doc/language/overload_resolution>) é realizada usando os [candidatos embutidos](<#/doc/language/operator_other>) para tentar converter os operandos para tipos embutidos.

    

  * Se a resolução de sobrecarga falhar, o programa é malformado.
  * Caso contrário, as conversões selecionadas são aplicadas e os operandos convertidos são usados no lugar dos operandos originais para o processo restante.

  * As conversões de array para ponteiro e de função para ponteiro são aplicadas a `E2` e `E3` (possivelmente convertidos). Após essas conversões, pelo menos uma das seguintes condições deve ser verdadeira, caso contrário o programa é malformado:

    

  * `E2` e `E3` têm o mesmo tipo. Neste caso, o resultado é desse tipo e o resultado é [inicializado por cópia](<#/doc/language/copy_initialization>) usando o operando selecionado.
  * Ambos `E2` e `E3` têm tipo aritmético ou de enumeração. Neste caso, as [conversões aritméticas usuais](<#/doc/language/usual_arithmetic_conversions>) são aplicadas para levá-los ao seu tipo comum, e o resultado é desse tipo.
  * Pelo menos um de `E2` e `E3` é um ponteiro. Neste caso, as conversões de lvalue para rvalue, ponteiro, ponteiro para função (desde C++17) e de qualificação são aplicadas para levá-los ao seu [tipo de ponteiro composto](<#/doc/language/pointer>), e o resultado é desse tipo.
  * Pelo menos um de `E2` e `E3` é um ponteiro para membros. Neste caso, as conversões de lvalue para rvalue, ponteiro para membro, ponteiro para função (desde C++17) e de qualificação são aplicadas para levá-los ao seu [tipo de ponteiro composto](<#/doc/language/pointer>), e o resultado é desse tipo.

    

    

  * Ambos `E2` e `E3` são constantes de ponteiro nulo, e pelo menos um deles é do tipo [std::nullptr_t](<#/doc/types/nullptr_t>). Neste caso, o resultado é do tipo [std::nullptr_t](<#/doc/types/nullptr_t>).

| (desde C++11)
```cpp
    int* intPtr;
    
    using Mixed = decltype(true ? nullptr : intPtr);
    
    static_assert(std::is_same_v<Mixed, int*>); // nullptr becoming int*
    
    struct A
    {
        int* m_ptr;
    } a;
    
    int* A::* memPtr = &A::m_ptr; // memPtr is a pointer to member m_ptr of A
    
    // memPtr makes nullptr as type of pointer to member m_ptr of A
    static_assert(std::is_same_v<decltype(false ? memPtr : nullptr), int*A::*>);
    
    // a.*memPtr is now just pointer to int and nullptr also becomes pointer to int
    static_assert(std::is_same_v<decltype(false ? a.*memPtr : nullptr), int*>);
```
  1. [↑](<#/doc/language/operator_other>) Tal operador condicional era comumente usado em [programação constexpr](<#/doc/language/constexpr>) em C++11 antes de C++14.
  2. [↑](<#/doc/language/operator_other>) Acesso a membro, se uma função de conversão é deletada (desde C++11) e se um operando é um bit-field são ignorados.

| Esta seção está incompleta
Razão: há alguma chance de tornar isso mais legível sem perder os detalhes? No mínimo, um micro-exemplo de uma linha para cada item ajudaria imensamente

#### Sobrecargas

Para cada par de tipos aritméticos promovidos `L` e `R` e para cada tipo `P`, onde `P` é um ponteiro, ponteiro para membro ou tipo de enumeração com escopo, as seguintes assinaturas de função participam da resolução de sobrecarga:

LR operator?:(bool, L, R);
P operator?:(bool, P, P);

onde `LR` é o resultado das [conversões aritméticas usuais](<#/doc/language/usual_arithmetic_conversions>) realizadas em `L` e `R`.

O operador “`?:`” não pode ser sobrecarregado; essas assinaturas de função existem apenas para fins de resolução de sobrecarga.

O tipo de resultado de um operador condicional também é acessível como o trait de tipo binário [std::common_type](<#/doc/types/common_type>). | (desde C++11)

Run this code
```cpp
    #include <iostream>
    #include <string>
    
    struct Node
    {
        Node* next;
        int data;
    
        // deep-copying copy constructor
        Node(const Node& other)
            : next(other.next ? new Node(*other.next) : NULL)
            , data(other.data)
        {}
    
        Node(int d) : next(NULL), data(d) {}
    
        ~Node() { delete next; }
    };
    
    int main()
    {   
        // simple rvalue example
        int n = 1 > 2 ? 10 : 11;  // 1 > 2 is false, so n = 11
    
        // simple lvalue example
        int m = 10; 
        (n == m ? n : m) = 7; // n == m is false, so m = 7
    
        //output the result
        std::cout << "n = " << n << "\nm = " << m;
    }
```

Output:
```
    n = 11
    m = 7
```

### Biblioteca padrão

Muitas classes na biblioteca padrão sobrecarregam `operator()` para serem usadas como objetos de função.

[ operator()](<#/doc/memory/default_delete>) | deleta o objeto ou array
(função membro pública de `std::default_delete<T>`)
[ operator()](<#/doc/utility/functional/plus>) | retorna a soma de dois argumentos
(função membro pública de `std::plus<T>`)
[ operator()](<#/doc/utility/functional/minus>) | retorna a diferença entre dois argumentos
(função membro pública de `std::minus<T>`)
[ operator()](<#/doc/utility/functional/multiplies>) | retorna o produto de dois argumentos
(função membro pública de `std::multiplies<T>`)
[ operator()](<#/doc/utility/functional/divides>) | retorna o resultado da divisão do primeiro argumento pelo segundo argumento
(função membro pública de `std::divides<T>`)
[ operator()](<#/doc/utility/functional/modulus>) | retorna o resto da divisão do primeiro argumento pelo segundo argumento
(função membro pública de `std::modulus<T>`)
[ operator()](<#/doc/utility/functional/negate>) | retorna a negação do argumento
(função membro pública de `std::negate<T>`)
[ operator()](<#/doc/utility/functional/equal_to>) | verifica se os argumentos são iguais
(função membro pública de `std::equal_to<T>`)
[ operator()](<#/doc/utility/functional/not_equal_to>) | verifica se os argumentos não são iguais
(função membro pública de `std::not_equal_to<T>`)
[ operator()](<#/doc/utility/functional/greater>) | verifica se o primeiro argumento é maior que o segundo
(função membro pública de `std::greater<T>`)
[ operator()](<#/doc/utility/functional/less>) | verifica se o primeiro argumento é menor que o segundo
(função membro pública de `std::less<T>`)
[ operator()](<#/doc/utility/functional/greater_equal>) | verifica se o primeiro argumento é maior ou igual ao segundo
(função membro pública de `std::greater_equal<T>`)
[ operator()](<#/doc/utility/functional/less_equal>) | verifica se o primeiro argumento é menor ou igual ao segundo
(função membro pública de `std::less_equal<T>`)
[ operator()](<#/doc/utility/functional/logical_and>) | retorna o AND lógico dos dois argumentos
(função membro pública de `std::logical_and<T>`)
[ operator()](<#/doc/utility/functional/logical_or>) | retorna o OR lógico dos dois argumentos
(função membro pública de `std::logical_or<T>`)
[ operator()](<#/doc/utility/functional/logical_not>) | retorna o NOT lógico do argumento
(função membro pública de `std::logical_not<T>`)
[ operator()](<#/doc/utility/functional/bit_and>) | retorna o resultado do AND bit a bit de dois argumentos
(função membro pública de `std::bit_and<T>`)
[ operator()](<#/doc/utility/functional/bit_or>) | retorna o resultado do OR bit a bit de dois argumentos
(função membro pública de `std::bit_or<T>`)
[ operator()](<#/doc/utility/functional/bit_xor>) | retorna o resultado do XOR bit a bit de dois argumentos
(função membro pública de `std::bit_xor<T>`)
[ operator()](<#/doc/utility/functional/unary_negate>) | retorna o complemento lógico do resultado de uma chamada ao predicado armazenado
(função membro pública de `std::unary_negate<Predicate>`)
[ operator()](<#/doc/utility/functional/binary_negate>) | retorna o complemento lógico do resultado de uma chamada ao predicado armazenado
(função membro pública de `std::binary_negate<Predicate>`)
[ operator()](<#/>) | chama a função armazenada
(função membro pública de `std::reference_wrapper<T>`)
[ operator()](<#/>) | invoca o alvo
(função membro pública de `std::function<R(Args...)>`)
[ operator()](<#/>) | invoca o alvo
(função membro pública de `std::move_only_function`)
[ operator()](<#/>) | invoca o alvo
(função membro pública de `std::copyable_function`)
[ operator()](<https://en.cppreference.com/mwiki/index.php?title=cpp/coroutine/coroutine_handle/operator\(\)&action=edit&redlink=1> "cpp/coroutine/coroutine handle/operator\(\) (page does not exist)") | retoma a execução da corrotina
(função membro pública de `std::coroutine_handle<Promise>`)
[ operator()](<#/>) | compara lexicograficamente duas strings usando o facet `collate` desta locale
(função membro pública de `std::locale`)
[ operator()](<#/doc/container/map/value_compare>) | compara dois valores do tipo `value_type`
(função membro pública de `std::map<Key,T,Compare,Allocator>::value_compare`)
[ operator()](<#/doc/container/multimap/value_compare>) | compara dois valores do tipo `value_type`
(função membro pública de `std::multimap<Key,T,Compare,Allocator>::value_compare`)
[ operator()](<#/>) | executa a função
(função membro pública de `std::packaged_task<R(Args...)>`)
[ operator()](<#/>) | avança o estado do motor e retorna o valor gerado
(função membro pública de `std::linear_congruential_engine<UIntType,a,c,m>`)
[ operator()](<#/>) (C++11) | gera o próximo número aleatório na distribuição
(função membro pública de `std::uniform_int_distribution<IntType>`)

O operador vírgula não é sobrecarregado por nenhuma classe na biblioteca padrão. A biblioteca Boost usa `operator,` em [boost.assign](<https://www.boost.org/doc/libs/release/libs/assign/doc/index.html#intro>), [boost.spirit](<https://www.boost.org/doc/libs/release/libs/spirit/doc/html/index.html>) e outras bibliotecas. A biblioteca de acesso a banco de dados [SOCI](<https://soci.sourceforge.net/doc.html>) também sobrecarrega `operator,`.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 446](<https://cplusplus.github.io/CWG/issues/446.html>) | C++98 | não era especificado se um temporário era criado para uma conversão de lvalue para rvalue no operador condicional | sempre cria um temporário se o operador retorna um rvalue de classe
[CWG 462](<https://cplusplus.github.io/CWG/issues/462.html>) | C++98 | se o segundo operando de um operador vírgula fosse um temporário, não era especificado se sua vida útil seria estendida quando o resultado da expressão de vírgula fosse ligado a uma referência | o resultado da expressão de vírgula é o temporário neste caso (portanto, sua vida útil é estendida)
[CWG 587](<https://cplusplus.github.io/CWG/issues/587.html>) | C++98 | quando o segundo e o terceiro operandos de um operador condicional eram lvalues do mesmo tipo, exceto pela qualificação cv, o resultado era um lvalue se esses operandos tivessem tipos de classe ou um rvalue caso contrário | o resultado é sempre um lvalue neste caso
[CWG 1029](<https://cplusplus.github.io/CWG/issues/1029.html>) | C++98 | o tipo de uma chamada de destrutor não era especificado | especificado como void
[CWG 1550](<https://cplusplus.github.io/CWG/issues/1550.html>) | C++98 | expressões throw entre parênteses não eram permitidas em expressões condicionais se o outro operando não fosse void | aceito
[CWG 1560](<https://cplusplus.github.io/CWG/issues/1560.html>) | C++98 | operando void de operadores condicionais causava conversão lvalue para rvalue gratuita no outro operando, sempre resultando em rvalue | uma expressão condicional com um void pode ser lvalue
[CWG 1642](<https://cplusplus.github.io/CWG/issues/1642.html>) | C++98 | a expressão `function` em uma expressão de chamada de função poderia ser um lvalue de ponteiro para função | não permitido
[CWG 1805](<https://cplusplus.github.io/CWG/issues/1805.html>) | C++98 | ao determinar o tipo alvo para a sequência de conversão implícita, a forma de converter Y para Z não era clara | esclarecido
[CWG 1895](<https://cplusplus.github.io/CWG/issues/1895.html>) | C++98
C++11 | incerto se a função de conversão deletada (C++11) ou inacessível (C++98) impedia a conversão em expressões condicionais, e conversões de classe base para prvalue de classe derivada não eram consideradas | tratado como resolução de sobrecarga
[CWG 1932](<https://cplusplus.github.io/CWG/issues/1932.html>) | C++98 | bit-fields do mesmo tipo estavam faltando em expressões condicionais | tratado por tipos subjacentes
[CWG 2226](<https://cplusplus.github.io/CWG/issues/2226.html>) | C++11 | ao determinar o tipo alvo do outro operando de um operador condicional, a referência não podia se ligar a um xvalue se esse operando fosse um lvalue | permitido
[CWG 2283](<https://cplusplus.github.io/CWG/issues/2283.html>) | C++17 | o requisito de completude de tipo para o operador de chamada de função foi acidentalmente removido por [P0135R1](<https://wg21.link/P0135R1>) | restaurado o requisito
[CWG 2321](<https://cplusplus.github.io/CWG/issues/2321.html>) | C++98 | ao determinar o tipo alvo do outro operando de um operador condicional, um tipo de classe derivada não podia ser convertido para um tipo de classe base menos cv-qualificado | permitido converter para o tipo de classe base com a qualificação cv do operando da classe derivada
[CWG 2715](<https://cplusplus.github.io/CWG/issues/2715.html>) | C++98 | a inicialização e destruição de cada parâmetro ocorreria no contexto da função chamadora, que pode não existir[1](<#/doc/language/operator_other>) | ocorre no contexto da full-expression envolvente
[CWG 2850](<https://cplusplus.github.io/CWG/issues/2850.html>) | C++98 | a ordem de destruição dos parâmetros não era clara | esclarecido
[CWG 2865](<https://cplusplus.github.io/CWG/issues/2865.html>) | C++98 | se `TX` e `TY` forem do mesmo tipo de classe e `TX` for mais cv-qualificado que `TY`, uma sequência de conversão implícita ainda poderia ser formada a partir de um prvalue Y | nenhuma sequência de conversão será formada neste caso
[CWG 2906](<https://cplusplus.github.io/CWG/issues/2906.html>) | C++98 | conversões de lvalue para rvalue eram aplicadas incondicionalmente no caso de resultado rvalue para o operador condicional | aplicado apenas em alguns casos

  1. [↑](<#/doc/language/operator_other>) Por exemplo, funções podem ser chamadas no inicializador de uma variável de escopo de namespace; não há uma “função chamadora” neste contexto.

### Ver também

[Precedência de operadores](<#/doc/language/operator_precedence>)
[Sobrecarga de operadores](<#/doc/language/operators>)

Operadores comuns
---
[atribuição](<#/doc/language/operator_assignment>) | [incremento
---|---
decremento](<#/doc/language/operator_incdec>) | [aritméticos](<#/doc/language/operator_arithmetic>) | [lógicos](<#/doc/language/operator_logical>) | [comparação](<#/doc/language/operator_comparison>) | [membro](<#/doc/language/operator_member_access>)
acesso](<#/doc/language/operator_member_access>) | **outros**  
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
a != b  a < b  
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
Operadores Especiais   
[`static_cast`](<#/doc/language/static_cast>) converte um tipo para outro tipo relacionado  
[`dynamic_cast`](<#/doc/language/dynamic_cast>) converte dentro de hierarquias de herança  
[`const_cast`](<#/doc/language/const_cast>) adiciona ou remove qualificadores [cv](<#/doc/language/cv>)  
[`reinterpret_cast`](<#/doc/language/reinterpret_cast>) converte um tipo para um tipo não relacionado  
[C-style cast](<#/doc/language/explicit_cast>) converte um tipo para outro por uma mistura de static_cast, const_cast e reinterpret_cast  
[`new`](<#/doc/language/new>) cria objetos com duração de armazenamento dinâmica  
[`delete`](<#/doc/language/delete>) destrói objetos criados anteriormente pela expressão new e libera a área de memória obtida  
[`sizeof`](<#/doc/language/sizeof>) consulta o tamanho de um tipo  
[`sizeof...`](<#/doc/language/sizeof...>) consulta o tamanho de um [pack](<#/doc/language/parameter_pack>) (desde C++11)  
[`typeid`](<#/doc/language/typeid>) consulta a informação de tipo de um tipo  
[`noexcept`](<#/doc/language/noexcept>) verifica se uma expressão pode lançar uma exceção (desde C++11)  
[`alignof`](<#/doc/language/alignof>) consulta os requisitos de alinhamento de um tipo (desde C++11)  
[Documentação C](<#/>) para Outros operadores  
---