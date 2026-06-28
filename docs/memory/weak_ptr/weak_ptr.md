# std::weak_ptr&lt;T&gt;::weak_ptr

```cpp
constexpr weak_ptr() noexcept;  // (1) (desde C++11)
weak_ptr( const weak_ptr& r ) noexcept;  // (2) (desde C++11)
template< class Y >
weak_ptr( const weak_ptr<Y>& r ) noexcept;  // (2) (desde C++11)
template< class Y >
weak_ptr( const std::shared_ptr<Y>& r ) noexcept;  // (2) (desde C++11)
weak_ptr( weak_ptr&& r ) noexcept;  // (3) (desde C++11)
template< class Y >
weak_ptr( weak_ptr<Y>&& r ) noexcept;  // (3) (desde C++11)
```

Constrói um novo `weak_ptr` que potencialmente compartilha um objeto com r.

1) Construtor padrão. Constrói um `weak_ptr` vazio.

2) Constrói um novo `weak_ptr` que compartilha um objeto gerenciado por r. Se r não gerencia nenhum objeto, *this também não gerencia nenhum objeto. As sobrecargas de template não participam da resolução de sobrecarga a menos que `Y*` seja implicitamente conversível para `T*`, ou `Y` seja o tipo "array de `N` `U`" para algum tipo `U` e algum número `N`, e `T` seja o tipo "array de limite desconhecido de `U` (possivelmente cv-qualificado)" (desde C++17).

3) Construtores de movimento. Move uma instância de `weak_ptr` de r para *this. Depois disso, r fica vazio e r.use_count() == 0. A sobrecarga de template não participa da resolução de sobrecarga a menos que `Y*` seja implicitamente conversível para `T*`.

### Parameters

- **r** — um [std::shared_ptr](<#/doc/memory/shared_ptr>) ou [std::weak_ptr](<#/doc/memory/weak_ptr>) que será visualizado por este [std::weak_ptr](<#/doc/memory/weak_ptr>)

### Notes

Como o construtor padrão é `constexpr`, `std::weak_ptr`s estáticos são inicializados como parte da [inicialização não-local estática](<#/doc/language/initialization>), antes que qualquer inicialização não-local dinâmica comece. Isso torna seguro usar um [std::weak_ptr](<#/doc/memory/weak_ptr>) em um construtor de qualquer objeto estático.

### Example

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    struct Foo {};
    
    int main()
    {
        std::weak_ptr<Foo> w_ptr;
    
        {
            auto ptr = std::make_shared<Foo>();
            w_ptr = ptr;
            std::cout << "w_ptr.use_count() inside scope: " << w_ptr.use_count() << '\n';
        }
    
        std::cout << "w_ptr.use_count() out of scope: " << w_ptr.use_count() << '\n';
        std::cout << "w_ptr.expired() out of scope: "
                  << std::boolalpha << w_ptr.expired() << '\n';
    }
```

Saída:
```
    w_ptr.use_count() inside scope: 1
    w_ptr.use_count() out of scope: 0
    w_ptr.expired() out of scope: true
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Applied to | Behavior as published | Correct behavior
---|---|---|---
[LWG 2315](<https://cplusplus.github.io/LWG/issue2315>) | C++11 | semântica de movimento não estava habilitada para `weak_ptr` | habilitada

### See also

[ operator=](<#/>) | atribui o `weak_ptr`
(função membro pública)