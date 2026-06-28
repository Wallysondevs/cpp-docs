# std::unique_ptr

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template<
class T,
class Deleter = std::default_delete<T>
> class unique_ptr;
template <
class T,
class Deleter
> class unique_ptr<T[], Deleter>;
```

`std::unique_ptr` é um smart pointer que possui (é responsável por) e gerencia outro objeto através de um ponteiro e, subsequentemente, descarta esse objeto quando o `unique_ptr` sai do escopo.

O objeto é descartado, usando o deleter associado, quando qualquer um dos seguintes eventos ocorre:

*   o objeto `unique_ptr` gerenciador é destruído.
*   o objeto `unique_ptr` gerenciador recebe outro ponteiro via [operator=](<#/>) ou [reset()](<#/doc/memory/unique_ptr/reset>).

O objeto é descartado, usando um deleter potencialmente fornecido pelo usuário, chamando `get_deleter()(ptr)`. O deleter padrão (`std::default_delete`) usa o operador `delete`, que destrói o objeto e desaloca a memória.

Um `unique_ptr` pode, alternativamente, não possuir nenhum objeto, caso em que é descrito como _vazio_.

Existem duas versões de `std::unique_ptr`:

1.  Gerencia um único objeto (por exemplo, alocado com `new`).
2.  Gerencia um array de objetos alocados dinamicamente (por exemplo, alocado com `new[]`).

A classe satisfaz os requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveAssignable](<#/doc/named_req/MoveAssignable>), mas não de [CopyConstructible](<#/doc/named_req/CopyConstructible>) nem de [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Requisitos de tipo
---
-`Deleter` deve ser um [FunctionObject](<#/doc/named_req/FunctionObject>) ou uma referência lvalue para um [FunctionObject](<#/doc/named_req/FunctionObject>) ou uma referência lvalue para uma função, chamável com um argumento do tipo `unique_ptr<T, Deleter>::pointer`.

### Notas

Apenas `unique_ptr` não-const pode transferir a posse do objeto gerenciado para outro `unique_ptr`. Se a vida útil de um objeto é gerenciada por um `const std::unique_ptr`, ela é limitada ao escopo em que o ponteiro foi criado.

`std::unique_ptr` é comumente usado para gerenciar a vida útil de objetos, incluindo:

*   fornecer segurança contra exceções para classes e funções que lidam com objetos de vida útil dinâmica, garantindo a exclusão tanto na saída normal quanto na saída por exceção.

*   passar a posse de objetos de posse única com vida útil dinâmica para funções.

*   adquirir a posse de objetos de posse única com vida útil dinâmica de funções.

*   como o tipo de elemento em containers que suportam `move semantics`, como [std::vector](<#/doc/container/vector>), que contêm ponteiros para objetos alocados dinamicamente (por exemplo, se um comportamento polimórfico for desejado).

`std::unique_ptr` pode ser construído para um [tipo incompleto](<#/doc/language/incomplete_type>) `T`, como para facilitar o uso como um handle no [idioma pImpl](<#/doc/language/pimpl>). Se o deleter padrão for usado, `T` deve ser completo no ponto do código onde o deleter é invocado, o que ocorre no destrutor, no operador de atribuição de movimento e na função membro `reset` de `std::unique_ptr`. (Em contraste, [std::shared_ptr](<#/doc/memory/shared_ptr>) não pode ser construído a partir de um ponteiro bruto para um tipo incompleto, mas pode ser destruído onde `T` é incompleto). Note que se `T` é uma especialização de template de classe, o uso de `unique_ptr` como um operando, por exemplo `!p`, requer que os parâmetros de `T` sejam completos devido a [ADL](<#/doc/language/adl>).

Se `T` é uma [classe derivada](<#/doc/language/derived_class>) de alguma base `B`, então `std::unique_ptr<T>` é [implicitamente conversível](<#/doc/memory/unique_ptr/unique_ptr>) para `std::unique_ptr<B>`. O deleter padrão do `std::unique_ptr<B>` resultante usará o [operador delete](<#/doc/memory/new/operator_delete>) para `B`, levando a [comportamento indefinido](<#/doc/language/destructor>) a menos que o destrutor de `B` seja [virtual](<#/doc/language/virtual>). Note que [std::shared_ptr](<#/doc/memory/shared_ptr>) se comporta de forma diferente: [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;B&gt; usará o [operador delete](<#/doc/memory/new/operator_delete>) para o tipo `T` e o objeto possuído será excluído corretamente mesmo que o destrutor de `B` não seja [virtual](<#/doc/language/virtual>).

Ao contrário de [std::shared_ptr](<#/doc/memory/shared_ptr>), `std::unique_ptr` pode gerenciar um objeto através de qualquer tipo de handle personalizado que satisfaça [NullablePointer](<#/doc/named_req/NullablePointer>). Isso permite, por exemplo, gerenciar objetos localizados em memória compartilhada, fornecendo um `Deleter` que define `typedef [boost::offset_ptr](<https://www.boost.org/doc/libs/release/doc/html/boost/interprocess/offset_ptr.html>) pointer;` ou outro [fancy pointer](<#/doc/named_req/Allocator>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_memory`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | `constexpr std::unique_ptr`

### Tipos membro

Tipo membro | Definição
---|---
pointer | [std::remove_reference](<#/doc/types/remove_reference>)&lt;Deleter&gt;::type::pointer se esse tipo existir, caso contrário `T*`. Deve satisfazer [NullablePointer](<#/doc/named_req/NullablePointer>)
element_type | `T`, o tipo do objeto gerenciado por este `unique_ptr`
deleter_type | `Deleter`, o function object ou referência lvalue para função ou para function object, a ser chamado do destrutor

### Funções membro

[ (construtor)](<#/doc/memory/unique_ptr/unique_ptr>) | constrói um novo `unique_ptr`
(função membro pública)
[ (destrutor)](<#/doc/memory/unique_ptr/~unique_ptr>) | destrói o objeto gerenciado se houver um presente
(função membro pública)
[ operator=](<#/>) | atribui o `unique_ptr`
(função membro pública)

##### Modificadores

[ release](<#/doc/memory/unique_ptr/release>) | retorna um ponteiro para o objeto gerenciado e libera a posse
(função membro pública)
[ reset](<#/doc/memory/unique_ptr/reset>) | substitui o objeto gerenciado
(função membro pública)
[ swap](<#/doc/memory/unique_ptr/swap>) | troca os objetos gerenciados
(função membro pública)

##### Observadores

[ get](<#/doc/memory/unique_ptr/get>) | retorna um ponteiro para o objeto gerenciado
(função membro pública)
[ get_deleter](<#/doc/memory/unique_ptr/get_deleter>) | retorna o deleter que é usado para a destruição do objeto gerenciado
(função membro pública)
[ operator bool](<#/doc/memory/unique_ptr/operator_bool>) | verifica se há um objeto gerenciado associado
(função membro pública)

##### Versão de objeto único, `unique_ptr<T>`

[ operator*operator->](<#/doc/memory/unique_ptr/operator_star_>) | desreferencia o ponteiro para o objeto gerenciado
(função membro pública)

##### Versão de array, `unique_ptr<T[]>`

[ operator[]](<#/doc/memory/unique_ptr/operator_at>) | fornece acesso indexado ao array gerenciado
(função membro pública)

### Funções não-membro

[ make_uniquemake_unique_for_overwrite](<#/doc/memory/unique_ptr/make_unique>)(C++14)(C++20) | cria um unique pointer que gerencia um novo objeto
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/memory/unique_ptr/operator_cmp>)(removido em C++20)(C++20) | compara com outro `unique_ptr` ou com `nullptr`
(template de função)
[ operator<<(std::unique_ptr)](<#/doc/memory/unique_ptr/operator_ltlt>)(C++20) | envia o valor do ponteiro gerenciado para um stream de saída
(template de função)
[ std::swap(std::unique_ptr)](<#/doc/memory/unique_ptr/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)

### Classes auxiliares

[ std::hash<std::unique_ptr>](<#/doc/memory/unique_ptr/hash>)(C++11) | suporte a hash para `std::unique_ptr`
(especialização de template de classe)

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <cstdio>
    #include <fstream>
    #include <iostream>
    #include <locale>
    #include <memory>
    #include <stdexcept>
    
    // classe auxiliar para demonstração de polimorfismo em tempo de execução abaixo
    struct B
    {
        virtual ~B() = default;
    
        virtual void bar() { std::cout << "B::bar\n"; }
    };
    
    struct D : B
    {
        D() { std::cout << "D::D\n"; }
        ~D() { std::cout << "D::~D\n"; }
    
        void bar() override { std::cout << "D::bar\n"; }
    };
    
    // uma função que consome um unique_ptr pode recebê-lo por valor ou por referência rvalue
    std::unique_ptr<D> pass_through(std::unique_ptr<D> p)
    {
        p->bar();
        return p;
    }
    
    // função auxiliar para a demonstração de deleter personalizado abaixo
    void close_file(std::FILE* fp)
    {
        std::fclose(fp);
    }
    
    // demonstração de lista encadeada baseada em unique_ptr
    struct List
    {
        struct Node
        {
            int data;
            std::unique_ptr<Node> next;
        };
    
        std::unique_ptr<Node> head;
    
        ~List()
        {
            // destrói os nós da lista sequencialmente em um loop, o destrutor padrão
            // teria invocado o destrutor de seu `next` recursivamente, o que causaria
            // estouro de pilha para listas suficientemente grandes.
            while (head)
            {
                auto next = std::move(head->next);
                head = std::move(next);
            }
        }
    
        void push(int data)
        {
            head = std::unique_ptr<Node>(new Node{data, std::move(head)});
        }
    };
    
    int main()
    {
        std::cout << "1) Unique ownership semantics demo\n";
        {
            // Cria um recurso (de posse única)
            std::unique_ptr<D> p = std::make_unique<D>();
    
            // Transfere a posse para `pass_through`,
            // que por sua vez transfere a posse de volta através do valor de retorno
            std::unique_ptr<D> q = pass_through(std::move(p));
    
            // p está agora em um estado 'vazio' movido, igual a nullptr
            assert(!p);
        }
    
        std::cout << "\n" "2) Runtime polymorphism demo\n";
        {
            // Cria um recurso derivado e aponta para ele via tipo base
            std::unique_ptr<B> p = std::make_unique<D>();
    
            // O dispatch dinâmico funciona como esperado
            p->bar();
        }
    
        std::cout << "\n" "3) Custom deleter demo\n";
        std::ofstream("demo.txt") << 'x'; // prepara o arquivo para leitura
        {
            using unique_file_t = std::unique_ptr<std::FILE, decltype(&close_file)>;
            unique_file_t fp(std::fopen("demo.txt", "r"), &close_file);
            if (fp)
                std::cout << char(std::fgetc(fp.get())) << '\n';
        } // `close_file()` é chamado aqui (se `fp` não for nulo)
    
        std::cout << "\n" "4) Custom lambda-expression deleter and exception safety demo\n";
        try
        {
            std::unique_ptr<D, void(*)(D*)> p(new D, 
            {
                std::cout << "destroying from a custom deleter...\n";
                delete ptr;
            });
    
            throw std::runtime_error(""); // `p` vazaria aqui se fosse um ponteiro simples
        }
        catch (const std::exception&)
        {
            std::cout << "Caught exception\n";
        }
    
        std::cout << "\n" "5) Array form of unique_ptr demo\n";
        {
            std::unique_ptr<D[]> p(new D[3]);
        } // `D::~D()` é chamado 3 vezes
    
        std::cout << "\n" "6) Linked list demo\n";
        {
            List wall;
            const int enough{1'000'000};
            for (int beer = 0; beer != enough; ++beer)
                wall.push(beer);
    
            std::cout.imbue(std::locale("en_US.UTF-8"));
            std::cout << enough << " bottles of beer on the wall...\n";
        } // destrói todas as cervejas
    }
```

Saída possível:
```
    1) Unique ownership semantics demo
    D::D
    D::bar
    D::~D
    
    2) Runtime polymorphism demo
    D::D
    D::bar
    D::~D
    
    3) Custom deleter demo
    x
    
    4) Custom lambda-expression deleter and exception safety demo
    D::D
    destroying from a custom deleter...
    D::~D
    Caught exception
    
    5) Array form of unique_ptr demo
    D::D
    D::D
    D::D
    D::~D
    D::~D
    D::~D
    
    6) Linked list demo
    1,000,000 bottles of beer on the wall...
```

### Veja também

[ shared_ptr](<#/doc/memory/shared_ptr>)(C++11) | smart pointer com semântica de posse de objeto compartilhada
(template de classe)
[ weak_ptr](<#/doc/memory/weak_ptr>)(C++11) | referência fraca a um objeto gerenciado por [std::shared_ptr](<#/doc/memory/shared_ptr>)
(template de classe)