# std::enable_shared_from_this

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
class enable_shared_from_this;
```

`std::enable_shared_from_this` permite que um objeto t que é atualmente gerenciado por um [std::shared_ptr](<#/doc/memory/shared_ptr>) chamado pt gere com segurança instâncias adicionais de [std::shared_ptr](<#/doc/memory/shared_ptr>), pt1, pt2 etc., que compartilham a propriedade de t com pt.

Herdar publicamente de `std::enable_shared_from_this<T>` fornece ao tipo `T` uma função membro `shared_from_this`. Se um objeto t do tipo `T` for gerenciado por um [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; chamado pt, então chamar `T::shared_from_this` retornará um novo [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; que compartilha a propriedade de t com pt.

### Membros de dados

Membro | Descrição
---|---
mutable [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; `_weak_this_` | o objeto que rastreia o bloco de controle do primeiro proprietário compartilhado de *this
(objeto membro apenas para exposição*)

### Funções membro

[ (construtor)](<#/doc/memory/enable_shared_from_this/enable_shared_from_this>) | constrói um objeto `enable_shared_from_this`
(função membro protegida)
[ (destrutor)](<#/doc/memory/enable_shared_from_this/~enable_shared_from_this>) | destrói um objeto `enable_shared_from_this`
(função membro protegida)
[ operator=](<#/>) | retorna uma referência para *this
(função membro protegida)
[ shared_from_this](<#/doc/memory/enable_shared_from_this/shared_from_this>) | retorna um [std::shared_ptr](<#/doc/memory/shared_ptr>) que compartilha a propriedade de *this
(função membro pública)
[ weak_from_this](<#/doc/memory/enable_shared_from_this/weak_from_this>)(C++17) | retorna um [std::weak_ptr](<#/doc/memory/weak_ptr>) que compartilha a propriedade de *this
(função membro pública)

### Notas

Os construtores de [std::shared_ptr](<#/doc/memory/shared_ptr>) detectam a presença de uma base `enable_shared_from_this` não ambígua e acessível (ou seja, herança pública é obrigatória) e atribuem o [std::shared_ptr](<#/doc/memory/shared_ptr>) recém-criado a `_weak_this_` se ainda não for de propriedade de um [std::shared_ptr](<#/doc/memory/shared_ptr>) ativo. Construir um [std::shared_ptr](<#/doc/memory/shared_ptr>) para um objeto que já é gerenciado por outro [std::shared_ptr](<#/doc/memory/shared_ptr>) não consultará `_weak_this_` e, portanto, levará a comportamento indefinido.

É permitido chamar `shared_from_this` apenas em um objeto previamente compartilhado, ou seja, em um objeto gerenciado por [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;. Caso contrário, [std::bad_weak_ptr](<#/doc/memory/bad_weak_ptr>) é lançada (pelo construtor de [std::shared_ptr](<#/doc/memory/shared_ptr>) a partir de um `_weak_this_` construído por padrão).

`enable_shared_from_this` fornece a alternativa segura para uma expressão como [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;(this), o que provavelmente resultará na destruição de `this` mais de uma vez por múltiplos proprietários que desconhecem a existência uns dos outros (veja o exemplo abaixo).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    class Good : public std::enable_shared_from_this<Good>
    {
    public:
        std::shared_ptr<Good> getptr()
        {
            return shared_from_this();
        }
    };
    
    class Best : public std::enable_shared_from_this<Best>
    {
        struct Private{ explicit Private() = default; };
    
    public:
        // Constructor is only usable by this class
        Best(Private) {}
    
        // Everyone else has to use this factory function
        // Hence all Best objects will be contained in shared_ptr
        static std::shared_ptr<Best> create()
        {
            return std::make_shared<Best>(Private());
        }
    
        std::shared_ptr<Best> getptr()
        {
            return shared_from_this();
        }
    };
    
    struct Bad
    {
        std::shared_ptr<Bad> getptr()
        {
            return std::shared_ptr<Bad>(this);
        }
        ~Bad() { std::cout << "Bad::~Bad() called\n"; }
    };
    
    void testGood()
    {
        // Good: the two shared_ptr's share the same object
        std::shared_ptr<Good> good0 = std::make_shared<Good>();
        std::shared_ptr<Good> good1 = good0->getptr();
        std::cout << "good1.use_count() = " << good1.use_count() << '\n';
    }
    
    void misuseGood()
    {
        // Bad: shared_from_this is called without having std::shared_ptr owning the caller
        try
        {
            Good not_so_good;
            std::shared_ptr<Good> gp1 = not_so_good.getptr();
        }
        catch (std::bad_weak_ptr& e)
        {
            // undefined behavior (until C++17) and std::bad_weak_ptr thrown (since C++17)
            std::cout << e.what() << '\n';
        }
    }
    
    void testBest()
    {
        // Best: Same but cannot stack-allocate it:
        std::shared_ptr<Best> best0 = Best::create();
        std::shared_ptr<Best> best1 = best0->getptr();
        std::cout << "best1.use_count() = " << best1.use_count() << '\n';
    
        // Best stackBest; // <- Will not compile because Best::Best() is private.
    }
    
    void testBad()
    {
        // Bad, each shared_ptr thinks it is the only owner of the object
        std::shared_ptr<Bad> bad0 = std::make_shared<Bad>();
        std::shared_ptr<Bad> bad1 = bad0->getptr();
        std::cout << "bad1.use_count() = " << bad1.use_count() << '\n';
    } // UB: double-delete of Bad
    
    int main()
    {
        testGood();
        misuseGood();
    
        testBest();
    
        testBad();
    }
```

Saída possível:
```
    good1.use_count() = 2
    bad_weak_ptr
    best1.use_count() = 2
    bad1.use_count() = 1
    Bad::~Bad() called
    Bad::~Bad() called
    *** glibc detected *** ./test: double free or corruption
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2179](<https://cplusplus.github.io/LWG/issue2179>)
([P0033R1](<https://wg21.link/P0033R1>)) | C++11 | dado o tipo `T` derivado de `enable_shared_from_this`, o comportamento de construir dois [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;s a partir do mesmo objeto T* era incerto | o comportamento é indefinido neste caso
[LWG 2529](<https://cplusplus.github.io/LWG/issue2529>)
([P0033R1](<https://wg21.link/P0033R1>)) | C++11 | não estava claro como o [std::weak_ptr](<#/doc/memory/weak_ptr>) subjacente é atualizado | esclarecido

### Veja também

[ shared_ptr](<#/doc/memory/shared_ptr>)(C++11) | smart pointer com semântica de propriedade de objeto compartilhada
(modelo de classe)
[ make_sharedmake_shared_for_overwrite](<#/doc/memory/shared_ptr/make_shared>)(C++20) | cria um shared pointer que gerencia um novo objeto
(modelo de função)