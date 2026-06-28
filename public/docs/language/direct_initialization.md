# Inicialização Direta

Inicializa um objeto a partir de um conjunto explícito de argumentos de construtor.

### Sintaxe

---
T object `(` arg `);` T object `(` arg1, arg2, ... `);` | (1) |
---|---|---
T object `{` arg `};` | (2) | (desde C++11)
T `(` other `)` T `(` arg1, arg2, ... `)` | (3) |
`static_cast <` T `>(` other `)` | (4) |
`new` T`(` args, ... `)` | (5) |
Class`::` Class`()` `:` member`(` args, ... `)` `{` ... `}` | (6) |
`[` arg`]() {` ... `}` | (7) | (desde C++11)

### Explicação

A inicialização direta é realizada nas seguintes situações:

1) Inicialização com uma lista não vazia de expressões entre parênteses ou braced-init-lists (desde C++11).

2) Inicialização de um objeto de tipo não-classe com um único inicializador entre chaves (nota: para tipos de classe e outros usos de braced-init-list, veja [list-initialization](<#/doc/language/list_initialization>)) (desde C++11).

3) Inicialização de um prvalue temporário (ate C++17) o objeto resultante de um prvalue (desde C++17) por um [function-style cast](<#/doc/language/explicit_cast>) ou com uma lista de expressões entre parênteses.

4) Inicialização de um prvalue temporário (ate C++17) o objeto resultante de um prvalue (desde C++17) por uma expressão [static_cast](<#/doc/language/static_cast>).

5) Inicialização de um objeto com duração de armazenamento dinâmica por uma new-expression com um inicializador.

6) Inicialização de uma base ou de um membro não-estático por [initializer list](<#/doc/language/initializer_list>) do construtor.

7) Inicialização de membros de objeto closure a partir das variáveis capturadas por cópia em uma lambda-expression.

Os efeitos da inicialização direta são:

*   Se `T` é um tipo array,

    *   o programa é malformado.

| (ate C++20)

    *   o array é inicializado como em [aggregate initialization](<#/doc/language/aggregate_initialization>), exceto que conversões de estreitamento são permitidas e quaisquer elementos sem um inicializador são [value-initialized](<#/doc/language/value_initialization>).

```cpp
    struct A
    {
        explicit A(int i = 0) {}
    };
    
    A a2); // OK: initializes a[0] with A(1) and a[1] with A()
    A b[2]{A(1)}; // error: implicit copy-list-initialization of b[1]
                  //        from {} selected explicit constructor
```

| (desde C++20)

*   Se `T` é um tipo de classe,

    *   se o inicializador é uma expressão [prvalue](<#/doc/language/value_category>) cujo tipo é a mesma classe que `T` (ignorando a qualificação cv), a própria expressão inicializadora, em vez de um temporário materializado a partir dela, é usada para inicializar o objeto de destino.
    (Antes de C++17, o compilador pode elidir a construção a partir do prvalue temporário neste caso, mas o construtor apropriado ainda deve ser acessível: veja [copy elision](<#/doc/language/copy_elision>))

| (desde C++17)

    *   os construtores de `T` são examinados e a melhor correspondência é selecionada por resolução de sobrecarga. O construtor é então chamado para inicializar o objeto.

    *   caso contrário, se o tipo de destino é uma classe aggregate (possivelmente cv-qualificada), ela é inicializada conforme descrito em [aggregate initialization](<#/doc/language/aggregate_initialization>), exceto que conversões de estreitamento são permitidas, designated initializers não são permitidos, um temporário vinculado a uma referência não tem sua vida útil estendida, não há brace elision, e quaisquer elementos sem um inicializador são [value-initialized](<#/doc/language/value_initialization>).

```cpp
    struct B
    {
        int a;
        int&& r;
    };
    
    int f();
    int n = 10;
    
    B b1{1, f()};            // OK, lifetime is extended
    B b2(1, f());            // well-formed, but dangling reference
    B b3{1.0, 1};            // error: narrowing conversion
    B b4(1.0, 1);            // well-formed, but dangling reference
    B b5(1.0, std::move(n)); // OK
```

| (desde C++20)

*   Caso contrário, se `T` é um tipo não-classe, mas o tipo de origem é um tipo de classe, as funções de conversão do tipo de origem e suas classes base, se houver, são examinadas e a melhor correspondência é selecionada por resolução de sobrecarga. A conversão definida pelo usuário selecionada é então usada para converter a expressão inicializadora no objeto que está sendo inicializado.
*   Caso contrário, se `T` é bool e o tipo de origem é [std::nullptr_t](<#/doc/types/nullptr_t>), o valor do objeto inicializado é false.
*   Caso contrário, [conversões padrão](<#/doc/language/implicit_cast>) são usadas, se necessário, para converter o valor de other para a versão cv-unqualified de `T`, e o valor inicial do objeto que está sendo inicializado é o valor (possivelmente convertido).

### Notas

A inicialização direta é mais permissiva do que a copy-initialization: a copy-initialization considera apenas construtores não-[explicit](<#/doc/language/explicit>) e funções de [conversão](<#/doc/language/cast_operator>) definidas pelo usuário não-explícitas, enquanto a inicialização direta considera todos os construtores e todas as funções de conversão definidas pelo usuário.

Em caso de ambiguidade entre uma declaração de variável usando a sintaxe de inicialização direta (1) (com parênteses redondos) e uma [declaração de função](<#/doc/language/function>), o compilador sempre escolhe a declaração de função. Esta regra de desambiguação é por vezes contra-intuitiva e tem sido chamada de [most vexing parse](<https://en.wikipedia.org/wiki/most_vexing_parse> "enwiki:most vexing parse").

Execute este código
```cpp
    #include <fstream>
    #include <iterator>
    #include <string>
    
    int main()
    {
        std::ifstream file("data.txt");
    
        // O seguinte é uma declaração de função:
        std::string foo1(std::istreambuf_iterator<char>(file),
                         std::istreambuf_iterator<char>());
        // Declara uma função chamada foo1, cujo tipo de retorno é std::string,
        // o primeiro parâmetro tem o tipo std::istreambuf_iterator<char> e o nome "file",
        // o segundo parâmetro não tem nome e tem o tipo std::istreambuf_iterator<char>(),
        // que é reescrito para o tipo de ponteiro de função std::istreambuf_iterator<char>(*)()
    
        // Correção pré-C++11 (para declarar uma variável) - adicione parênteses extras em torno de um
        // dos argumentos:
        std::string str1((std::istreambuf_iterator<char>(file)),
                          std::istreambuf_iterator<char>());
    
        // Correção pós-C++11 (para declarar uma variável) - use list-initialization para qualquer
        // dos argumentos:
        std::string str2(std::istreambuf_iterator<char>{file}, {});
    }
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    #include <string>
    
    struct Foo
    {
        int mem;
        explicit Foo(int n) : mem(n) {}
    };
    
    int main()
    {
        std::string s1("test"); // construtor a partir de const char*
        std::string s2(10, 'a');
    
        std::unique_ptr<int> p(new int(1));  // OK: construtores explicit são permitidos
    //  std::unique_ptr<int> p = new int(1); // erro: construtor é explicit
    
        Foo f(2); // f é inicializado diretamente:
                  // o parâmetro n do construtor é copy-initialized a partir do rvalue 2
                  // f.mem é inicializado diretamente a partir do parâmetro n
    //  Foo f2 = 2; // erro: construtor é explicit
    
        std::cout << s1 << ' ' << s2 << ' ' << *p << ' ' << f.mem  << '\n';
    }
```

Saída:
```
    test aaaaaaaaaa 1 2
```

### Veja também

*   [copy elision](<#/doc/language/copy_elision>)
*   [construtor de conversão](<#/doc/language/converting_constructor>)
*   [atribuição por cópia](<#/doc/language/as_operator>)
*   [construtor de cópia](<#/doc/language/copy_constructor>)
*   [construtor padrão](<#/doc/language/default_constructor>)
*   [destrutor](<#/doc/language/destructor>)
*   [`explicit`](<#/doc/language/explicit>)
*   [inicialização](<#/doc/language/initialization>)
    *   [aggregate initialization](<#/doc/language/aggregate_initialization>)
    *   [inicialização constante](<#/doc/language/constant_initialization>)
    *   [copy initialization](<#/doc/language/copy_initialization>)
    *   [inicialização padrão](<#/doc/language/default_initialization>)
    *   [initializer list](<#/doc/language/initializer_list>)
    *   [list initialization](<#/doc/language/list_initialization>)
    *   [inicialização de referência](<#/doc/language/reference_initialization>)
    *   [value initialization](<#/doc/language/value_initialization>)
    *   [zero initialization](<#/doc/language/zero_initialization>)
*   [atribuição por movimento](<#/doc/language/move_operator>)
*   [construtor de movimento](<#/doc/language/move_constructor>)
*   [`new`](<#/doc/language/new>)
