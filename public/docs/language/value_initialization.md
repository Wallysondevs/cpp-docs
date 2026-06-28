# Inicialização por valor

Esta é a inicialização realizada quando um objeto é construído com um inicializador vazio.

### Sintaxe

---
T `()` | (1) |
---|---|---
`new` T `()` | (2) |
Class`::` Class`(`...`)` `:` member `()` `{` ... `}` | (3) |
T object `{};` | (4) | (desde C++11)
T `{}` | (5) | (desde C++11)
`new` T `{}` | (6) | (desde C++11)
Class`::` Class`(`...`)` `:` member `{}` `{` ... `}` | (7) | (desde C++11)

### Explicação

A inicialização por valor é realizada nestas situações:

1,5) quando um objeto temporário sem nome é criado com o inicializador consistindo de um par vazio de parênteses ou chaves (desde C++11);

2,6) quando um objeto com duração de armazenamento dinâmica é criado por uma [expressão new](<#/doc/language/new>) com o inicializador consistindo de um par vazio de parênteses ou chaves (desde C++11);

3,7) quando um membro de dados não estático ou uma classe base é inicializado usando um [inicializador de membro](<#/doc/language/initializer_list>) com um par vazio de parênteses ou chaves (desde C++11);

4) quando um objeto nomeado (automático, estático ou thread-local) é declarado com o inicializador consistindo de um par de chaves.

Em todos os casos, se o par vazio de chaves `{}` for usado e `T` for um tipo aggregate, a [inicialização aggregate](<#/doc/language/aggregate_initialization>) é realizada em vez da inicialização por valor.

Se `T` for um tipo de classe que não possui um construtor padrão, mas possui um construtor que aceita [std::initializer_list](<#/doc/utility/initializer_list>), a [inicialização por lista](<#/doc/language/list_initialization>) é realizada. | (desde C++11)

Os efeitos da inicialização por valor são:

*   Se `T` for um tipo de classe (possivelmente cv-qualificado):

    *   Se a inicialização padrão para `T` selecionar um [construtor](<#/doc/language/initializer_list>), e o construtor não for declarado pelo usuário (até C++11) [fornecido pelo usuário](<#/doc/language/function>) (desde C++11), o objeto é primeiro [zero-inicializado](<#/doc/language/zero_initialization>).
    *   Em qualquer caso, o objeto é [inicializado por padrão](<#/doc/language/default_initialization>).

*   Caso contrário, se `T` for um tipo array, cada elemento do array é inicializado por valor.
*   Caso contrário, o objeto é zero-inicializado.

### Notas

A sintaxe T object(); não inicializa um objeto; ela declara uma função que não recebe argumentos e retorna `T`. A maneira de inicializar por valor uma variável nomeada antes do C++11 era T object = T();, que inicializa por valor um temporário e então inicializa por cópia o objeto: a maioria dos compiladores [otimiza a cópia](<#/doc/language/copy_elision>) neste caso.

Referências não podem ser inicializadas por valor.

Conforme descrito em [conversão de estilo de função](<#/doc/language/explicit_cast>), a sintaxe T() (1) é proibida se `T` nomear um tipo array, enquanto T{} (5) é permitida.

Todos os containers padrão ([std::vector](<#/doc/container/vector>), [std::list](<#/doc/container/list>), etc.) inicializam por valor seus elementos quando construídos com um único argumento `size_type` ou quando expandidos por uma chamada a resize(), a menos que seu allocator personalize o comportamento de construct.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <string>
    #include <vector>
    
    struct T1
    {
        int mem1;
        std::string mem2;
        virtual void foo() {} // garante que T1 não é um aggregate
    }; // construtor padrão implícito
    
    struct T2
    {
        int mem1;
        std::string mem2;
        T2(const T2&) {} // construtor de cópia fornecido pelo usuário
    };                   // sem construtor padrão
    
    struct T3
    {
        int mem1;
        std::string mem2;
        T3() {} // construtor padrão fornecido pelo usuário
    };
    
    std::string s{}; // classe => inicialização padrão, o valor é ""
    
    int main()
    {
        int n{};                // escalar => zero-inicialização, o valor é 0
        assert(n == 0);
        double f = double();    // escalar => zero-inicialização, o valor é 0.0
        assert(f == 0.0);
        int* a = new int10; // array => inicialização por valor de cada elemento
        assert(a[9] == 0);      //          o valor de cada elemento é 0
        T1 t1{};                // classe com construtor padrão implícito =>
        assert(t1.mem1 == 0);   //     t1.mem1 é zero-inicializado, o valor é 0
        assert(t1.mem2 == "");  //     t1.mem2 é inicializado por padrão, o valor é ""
    //  T2 t2{};                // erro: classe sem construtor padrão
        T3 t3{};                // classe com construtor padrão fornecido pelo usuário =>
        std::cout << t3.mem1;   //     t3.mem1 é inicializado por padrão para um valor indeterminado
        assert(t3.mem2 == "");  //     t3.mem2 é inicializado por padrão, o valor é ""
        std::vector<int> v(3);  // inicialização por valor de cada elemento
        assert(v[2] == 0);      // o valor de cada elemento é 0
        std::cout << '\n';
        delete[] a;
    }
```

Saída possível:
```
    42
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Applied to | Behavior as published | Correct behavior
---|---|---|---
[CWG 178](<https://cplusplus.github.io/CWG/issues/178.html>) | C++98 | não havia inicialização por valor; inicializador vazio invocava inicialização padrão (embora new T() também realize zero-inicialização) | inicializador vazio invoca inicialização por valor
[CWG 543](<https://cplusplus.github.io/CWG/issues/543.html>) | C++98 | inicialização por valor para um objeto de classe sem construtores fornecidos pelo usuário era equivalente a inicializar por valor cada subobjeto (o que não necessariamente zero-inicializava um membro com construtor padrão fornecido pelo usuário) | zero-inicializa o objeto inteiro, então chama o construtor padrão
[CWG 1301](<https://cplusplus.github.io/CWG/issues/1301.html>) | C++11 | inicialização por valor de unions com construtores padrão deletados levava à zero-inicialização | eles são inicializados por padrão
[CWG 1368](<https://cplusplus.github.io/CWG/issues/1368.html>) | C++98 | qualquer construtor fornecido pelo usuário fazia com que a zero-inicialização fosse ignorada | apenas um construtor padrão fornecido pelo usuário ignora a zero-inicialização
[CWG 1502](<https://cplusplus.github.io/CWG/issues/1502.html>) | C++11 | inicializar por valor uma union sem um construtor padrão fornecido pelo usuário apenas zero-inicializava o objeto, apesar dos inicializadores de membro padrão | realiza inicialização padrão após zero-inicialização
[CWG 1507](<https://cplusplus.github.io/CWG/issues/1507.html>) | C++98 | inicialização por valor para um objeto de classe sem construtores fornecidos pelo usuário não verificava a validade do construtor padrão quando este era trivial | a validade do construtor padrão trivial é verificada
[CWG 2820](<https://cplusplus.github.io/CWG/issues/2820.html>) | C++98 | a inicialização padrão após a zero-inicialização exigia um construtor não trivial | não exigido
[CWG 2859](<https://cplusplus.github.io/CWG/issues/2859.html>) | C++98 | inicialização por valor para um objeto de classe poderia envolver zero-inicialização mesmo que a inicialização padrão não selecionasse de fato um construtor fornecido pelo usuário | não há zero-inicialização neste caso

### Ver também

*   [default constructor](<#/doc/language/default_constructor>)
*   [`explicit`](<#/doc/language/explicit>)
*   [aggregate initialization](<#/doc/language/aggregate_initialization>)
*   [list-initialization](<#/doc/language/list_initialization>)
