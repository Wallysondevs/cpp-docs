# PImpl

"Ponteiro para implementação" ou "pImpl" é uma [técnica de programação](<#/doc/language/pimpl>) C++ que remove detalhes de implementação de uma classe de sua representação de objeto, colocando-os em uma classe separada, acessada através de um ponteiro opaco:
```cpp
    // --------------------
    // interface (widget.h)
    struct widget
    {
        // public members
    private:
        struct impl; // forward declaration of the implementation class
        // One implementation example: see below for other design options and trade-offs
        std::experimental::propagate_const< // const-forwarding pointer wrapper
            std::unique_ptr<                // unique-ownership opaque pointer
                impl>> pImpl;               // to the forward-declared implementation class
    };
     
    // ---------------------------
    // implementation (widget.cpp)
    struct widget::impl
    {
        // implementation details
    };
```

Esta técnica é usada para construir interfaces de bibliotecas C++ com ABI estável e para reduzir dependências em tempo de compilação.

### Explicação

Como membros de dados privados de uma classe participam de sua representação de objeto, afetando tamanho e layout, e como funções membro privadas de uma classe participam da [resolução de sobrecarga](<#/doc/language/overload_resolution>) (que ocorre antes da verificação de acesso a membros), qualquer alteração nesses detalhes de implementação requer a recompilação de todos os usuários da classe.

pImpl remove essa dependência de compilação; alterações na implementação não causam recompilação. Consequentemente, se uma biblioteca usa pImpl em sua ABI, versões mais recentes da biblioteca podem alterar a implementação enquanto permanecem compatíveis com a ABI de versões mais antigas.

### Trade-offs

As alternativas para o idioma pImpl são

  * implementação inline: membros privados e membros públicos são membros da mesma classe.
  * classe abstrata pura (factory OOP): usuários obtêm um unique pointer para uma classe base leve ou abstrata, os detalhes de implementação estão na classe derivada que sobrescreve suas funções membro virtuais.

#### Firewall de compilação

Em casos simples, tanto pImpl quanto o método factory removem a dependência em tempo de compilação entre a implementação e os usuários da interface da classe. O método factory cria uma dependência oculta na vtable, e assim reordenar, adicionar ou remover funções membro virtuais quebra a ABI. A abordagem pImpl não tem dependências ocultas, no entanto, se a classe de implementação for uma especialização de template de classe, o benefício do firewall de compilação é perdido: os usuários da interface devem observar toda a definição do template para instanciar a especialização correta. Uma abordagem de design comum neste caso é refatorar a implementação de uma forma que evite a parametrização, este é outro caso de uso para as C++ Core Guidelines:

  * [T.61 Não parametrize excessivamente membros](<https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#Rt-scary>) e
  * [T.84 Use uma implementação central não-template para fornecer uma interface ABI-estável](<https://github.com/isocpp/CppCoreGuidelines/blob/master/CppCoreGuidelines.md#t84-use-a-non-template-core-implementation-to-provide-an-abi-stable-interface>).

Por exemplo, o seguinte template de classe não usa o tipo `T` em seu membro privado ou no corpo de `push_back`:
```cpp
    template<class T>
    class ptr_vector
    {
        std::vector<void*> vp;
    public:
        void push_back(T* p)
        {
            vp.push_back(p);
        }
    };
```

Portanto, membros privados podem ser transferidos para a implementação como estão, e `push_back` pode encaminhar para uma implementação que também não usa `T` na interface:

Run this code
```cpp
    // ---------------------
    // header (ptr_vector.hpp)
    #include <memory>
     
    class ptr_vector_base
    {
        struct impl; // does not depend on T
        std::unique_ptr<impl> pImpl;
    protected:
        void push_back_fwd(void*);
        void print() const;
        // ... see implementation section for special member functions
    public:
        ptr_vector_base();
        ~ptr_vector_base();
    };
     
    template<class T>
    class ptr_vector : private ptr_vector_base
    {
    public:
        void push_back(T* p) { push_back_fwd(p); }
        void print() const { ptr_vector_base::print(); }
    };
     
    // -----------------------
    // source (ptr_vector.cpp)
    // #include "ptr_vector.hpp"
    #include <iostream>
    #include <vector>
     
    struct ptr_vector_base::impl
    {
        std::vector<void*> vp;
     
        void push_back(void* p)
        {
            vp.push_back(p);
        }
     
        void print() const
        {
            for (void const * const p: vp) std::cout << p << '\n';
        }
    };
     
    void ptr_vector_base::push_back_fwd(void* p) { pImpl->push_back(p); }
    ptr_vector_base::ptr_vector_base() : pImpl{std::make_unique<impl>()} {}
    ptr_vector_base::~ptr_vector_base() {}
    void ptr_vector_base::print() const { pImpl->print(); }
     
    // ---------------
    // user (main.cpp)
    // #include "ptr_vector.hpp"
     
    int main()
    {
        int x{}, y{}, z{};
        ptr_vector<int> v;
        v.push_back(&x);
        v.push_back(&y);
        v.push_back(&z);
        v.print();
    }
```

Saída possível:
```
    0x7ffd6200a42c
    0x7ffd6200a430
    0x7ffd6200a434
```

#### Custo de execução (runtime overhead)

  * Custo de acesso: Em pImpl, cada chamada a uma função membro privada indireciona através de um ponteiro. Cada acesso a um membro público feito por um membro privado indireciona através de outro ponteiro. Ambas as indireções cruzam os limites da unidade de tradução e, portanto, só podem ser otimizadas por otimização em tempo de linkagem. Note que o factory OO requer indireção entre unidades de tradução para acessar tanto dados públicos quanto detalhes de implementação, e oferece ainda menos oportunidades para o otimizador em tempo de linkagem devido ao dispatch virtual.
  * Custo de espaço: pImpl adiciona um ponteiro ao componente público e, se algum membro privado precisar de acesso a um membro público, outro ponteiro é adicionado ao componente de implementação ou passado como parâmetro para cada chamada ao membro privado que o requer. Se alocadores personalizados com estado forem suportados, a instância do alocador também precisa ser armazenada.
  * Custo de gerenciamento de tempo de vida: pImpl (assim como o factory OO) coloca o objeto de implementação no heap, o que impõe um custo de execução significativo na construção e destruição. Isso pode ser parcialmente compensado por alocadores personalizados, já que o tamanho da alocação para pImpl (mas não para o factory OO) é conhecido em tempo de compilação.

Por outro lado, classes pImpl são amigáveis à movimentação (move-friendly); refatorar uma classe grande como pImpl movível pode melhorar o desempenho de algoritmos que manipulam containers que contêm tais objetos, embora pImpl movível tenha uma fonte adicional de custo de execução: qualquer função membro pública que é permitida em um objeto movido-de e precisa de acesso à implementação privada incorre em uma verificação de ponteiro nulo.

| Esta seção está incompleta
Razão: Microbenchmark?)

#### Custo de manutenção

O uso de pImpl requer uma unidade de tradução dedicada (uma biblioteca header-only não pode usar pImpl), introduz uma classe adicional, um conjunto de funções de encaminhamento e, se alocadores forem usados, expõe o detalhe de implementação do uso do alocador na interface pública.

Como membros virtuais fazem parte do componente de interface de pImpl, simular um pImpl implica simular apenas o componente de interface. Um pImpl testável é tipicamente projetado para permitir cobertura total de testes através da interface disponível.

### Implementação

Como o objeto do tipo de interface controla o tempo de vida do objeto do tipo de implementação, o ponteiro para a implementação é geralmente [std::unique_ptr](<#/doc/memory/unique_ptr>).

Como [std::unique_ptr](<#/doc/memory/unique_ptr>) exige que o tipo apontado seja um tipo completo em qualquer contexto onde o deleter é instanciado, as funções membro especiais devem ser declaradas pelo usuário e definidas fora da linha (out-of-line), no arquivo de implementação, onde a classe de implementação é completa.

Porque quando uma função membro const chama uma função através de um ponteiro membro não-const, a sobrecarga não-const da função de implementação é chamada, o ponteiro precisa ser encapsulado em [std::experimental::propagate_const](<#/doc/experimental/propagate_const>) ou equivalente.

Todos os membros de dados privados e todas as funções membro não-virtuais privadas são colocados na classe de implementação. Todos os membros públicos, protegidos e virtuais permanecem na classe de interface (veja [GOTW #100](<https://herbsutter.com/gotw/_100/>) para a discussão das alternativas).

Se algum dos membros privados precisar acessar um membro público ou protegido, uma referência ou ponteiro para a interface pode ser passado para a função privada como um parâmetro. Alternativamente, a referência de retorno (back-reference) pode ser mantida como parte da classe de implementação.

Se alocadores não-padrão forem destinados a serem suportados para a alocação do objeto de implementação, qualquer um dos padrões usuais de reconhecimento de alocador pode ser utilizado, incluindo o parâmetro de template do alocador com valor padrão para [std::allocator](<#/doc/memory/allocator>) e argumento do construtor do tipo [`std::pmr::memory_resource*`](<#/doc/memory/memory_resource>).

### Notas

| Esta seção está incompleta
Razão: notar conexão com polimorfismo de semântica de valor

### Exemplo

Demonstra um pImpl com propagação de const, com referência de retorno passada como parâmetro, sem reconhecimento de alocador, e habilitado para movimentação (move-enabled) sem verificações em tempo de execução:

Run this code
```cpp
    // ----------------------
    // interface (widget.hpp)
    #include <experimental/propagate_const>
    #include <iostream>
    #include <memory>
     
    class widget
    {
        class impl;
        std::experimental::propagate_const<std::unique_ptr<impl>> pImpl;
    public:
        void draw() const; // public API that will be forwarded to the implementation
        void draw();
        bool shown() const { return true; } // public API that implementation has to call
     
        widget(); // even the default ctor needs to be defined in the implementation file
                  // Note: calling draw() on default constructed object is UB
        explicit widget(int);
        ~widget(); // defined in the implementation file, where impl is a complete type
        widget(widget&&); // defined in the implementation file
                          // Note: calling draw() on moved-from object is UB
        widget(const widget&) = delete;
        widget& operator=(widget&&); // defined in the implementation file
        widget& operator=(const widget&) = delete;
    };
     
    // ---------------------------
    // implementation (widget.cpp)
    // #include "widget.hpp"
     
    class widget::impl
    {
        int n; // private data
    public:
        void draw(const widget& w) const
        {
            if (w.shown()) // this call to public member function requires the back-reference 
                std::cout << "drawing a const widget " << n << '\n';
        }
     
        void draw(const widget& w)
        {
            if (w.shown())
                std::cout << "drawing a non-const widget " << n << '\n';
        }
     
        impl(int n) : n(n) {}
    };
     
    void widget::draw() const { pImpl->draw(*this); }
    void widget::draw() { pImpl->draw(*this); }
    widget::widget() = default;
    widget::widget(int n) : pImpl{std::make_unique<impl>(n)} {}
    widget::widget(widget&&) = default;
    widget::~widget() = default;
    widget& widget::operator=(widget&&) = default;
     
    // ---------------
    // user (main.cpp)
    // #include "widget.hpp"
     
    int main()
    {
        widget w(7);
        const widget w2(8);
        w.draw();
        w2.draw();
    }
```

Saída:
```
    drawing a non-const widget 7
    drawing a const widget 8
```

| Esta seção está incompleta
Razão: descrever outra alternativa — "fast PImpl". A principal diferença é que a memória para a implementação é reservada em um membro de dados que é um C-array opaco (dentro da definição da classe PImpl), enquanto no arquivo cpp essa memória é mapeada (via `reinterpret_cast` ou placement-`new`) para a estrutura de implementação. Essa abordagem tem seus próprios prós e contras, em particular, um _pró_ óbvio é a ausência de alocação extra, desde que memória suficiente tenha sido inicialmente reservada em _tempo de design_ da classe PImpl. (Enquanto entre os _contras_ está a reduzida amigabilidade à movimentação.)

### Links externos

1.  | [GotW #28](<http://www.gotw.ca/gotw/028.htm>) : O Idioma Fast Pimpl.
---|---
2.  | [GotW #100](<https://herbsutter.com/gotw/_100/>): Firewalls de Compilação.
3.  | [O Padrão Pimpl - o que você deve saber.](<https://www.cppstories.com/2018/01/pimpl/>)