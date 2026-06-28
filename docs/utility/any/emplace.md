# std::any::emplace

```cpp
template< class ValueType, class... Args >
std::decay_t<ValueType>& emplace( Args&&... args );  // (1) (desde C++17)
template< class ValueType, class U, class... Args >
std::decay_t<ValueType>& emplace( std::initializer_list<U> il, Args&&... args );  // (2) (desde C++17)
```

  
Altera o objeto contido para um do tipo [std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt; construído a partir dos argumentos.

Primeiro destrói o objeto contido atual (se houver) por [reset()](<#/doc/utility/any/reset>), então:

1) constrói um objeto do tipo [std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;, [direct-non-list-initialized](<#/doc/language/direct_initialization>) a partir de [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)..., como o objeto contido.

  * Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;, Args...> e [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;> forem ambos verdadeiros.

2) constrói um objeto do tipo [std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;, [direct-non-list-initialized](<#/doc/language/direct_initialization>) a partir de il, [std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)..., como o objeto contido.

  * Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_constructible_v](<#/doc/types/is_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;, [std::initializer_list](<#/doc/utility/initializer_list>)&lt;U&gt;&, Args...> e [std::is_copy_constructible_v](<#/doc/types/is_copy_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;> forem ambos verdadeiros.

### Parâmetros de template

ValueType  |  \-  |  tipo de valor contido   
Requisitos de tipo   
-`std::decay_t<ValueType>` deve satisfazer os requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>).   
  
### Valor de retorno

Uma referência para o novo objeto contido.

### Exceções

Lança qualquer exceção lançada pelo construtor de `T`. Se uma exceção for lançada, o objeto contido anteriormente (se houver) foi destruído, e *this não contém um valor.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <any>
    #include <iostream>
    #include <string>
    #include <vector>
     
    class Star
    {
        std::string name;
        int id;
     
    public:
        Star(std::string name, int id) : name{name}, id{id}
        {
            std::cout << "Star::Star(string, int)\n";
        }
     
        void print() const
        {
            std::cout << "Star{\"" << name << "\" : " << id << "};\n";
        }
    };
     
    int main()
    {
        std::any celestial;
        // (1) emplace(Args&&... args);
        celestial.emplace<Star>("Procyon", 2943);
        const auto* star = std::any_cast<Star>(&celestial);
        star->print();
     
        std::any av;
        // (2) emplace(std::initializer_list<U> il, Args&&... args);
        av.emplace<std::vector<char>>({'C', '+', '+', '1', '7'} /* no args */);
        std::cout << av.type().name() << '\n';
        const auto* va = std::any_cast<std::vector<char>>(&av);
        std::for_each(va->cbegin(), va->cend(),  { std::cout << c; });
        std::cout << '\n';
    }
```

Saída possível: 
```
    Star::Star(string, int)
    Star{"Procyon" : 2943};
    St6vectorIcSaIcEE
    C++17
```

### Veja também

[ (construtor)](<#/doc/utility/any/any>) |  constrói um objeto `any`   
(função membro pública)  
[ reset](<#/doc/utility/any/reset>) |  destrói o objeto contido   
(função membro pública)