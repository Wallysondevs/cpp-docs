# std::shared_ptr&lt;T&gt;::owner_before

template< class Y >   
bool owner_before( const shared_ptr&lt;Y&gt;& other ) const noexcept;
template< class Y >  
bool owner_before( const [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;Y&gt;& other ) const noexcept;

  
Verifica se este `shared_ptr` precede `other` em uma ordem definida pela implementação baseada no proprietário (em oposição à baseada em valor). A ordem é tal que dois smart pointers se comparam como equivalentes apenas se ambos estiverem vazios ou se ambos possuírem o mesmo objeto, mesmo que os valores dos ponteiros obtidos por [get()](<#/doc/memory/shared_ptr/get>) sejam diferentes (por exemplo, porque apontam para subobjetos diferentes dentro do mesmo objeto).

Esta ordenação é usada para tornar shared e weak pointers utilizáveis como chaves em containers associativos, tipicamente através de [std::owner_less](<#/doc/memory/owner_less>).

### Parâmetros

other  |  \-  |  o [std::shared_ptr](<#/doc/memory/shared_ptr>) ou [std::weak_ptr](<#/doc/memory/weak_ptr>) a ser comparado   
  
### Valor de retorno

`true` se `*this` precede `other`, `false` caso contrário. Implementações comuns comparam os endereços dos blocos de controle.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
     
    struct Foo
    {
        int n1;
        int n2; 
        Foo(int a, int b) : n1(a), n2(b) {}
    };
     
    int main()
    {   
        auto p1 = std::make_shared<Foo>(1, 2);
        std::shared_ptr<int> p2(p1, &p1->n1);
        std::shared_ptr<int> p3(p1, &p1->n2);
     
        std::cout << std::boolalpha
                  << "p2 < p3 " << (p2 < p3) << '\n'
                  << "p3 < p2 " << (p3 < p2) << '\n'
                  << "p2.owner_before(p3) " << p2.owner_before(p3) << '\n'
                  << "p3.owner_before(p2) " << p3.owner_before(p2) << '\n';
     
        std::weak_ptr<int> w2(p2);
        std::weak_ptr<int> w3(p3);
        std::cout 
    //            << "w2 < w3 " << (w2 < w3) << '\n' // won't compile 
    //            << "w3 < w2 " << (w3 < w2) << '\n' // won't compile
                  << "w2.owner_before(w3) " << w2.owner_before(w3) << '\n'
                  << "w3.owner_before(w2) " << w3.owner_before(w2) << '\n';
    }
```

Saída: 
```
    p2 < p3 true
    p3 < p2 false
    p2.owner_before(p3) false
    p3.owner_before(p2) false
    w2.owner_before(w3) false
    w3.owner_before(w2) false
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2873](<https://cplusplus.github.io/LWG/issue2873>) | C++11  | `owner_before` não era declarado noexcept | declarado noexcept  
  
### Veja também

[ owner_less](<#/doc/memory/owner_less>)(C++11) | fornece ordenação baseada no proprietário de tipos mistos para shared e weak pointers (modelo de classe)   