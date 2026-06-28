# std::unique_ptr&lt;T,Deleter&gt;::operator*, std::unique_ptr&lt;T,Deleter&gt;::operator-&gt;

```cpp
typename std::add_lvalue_reference<T>::type operator*() const
noexcept(noexcept(*std::declval<pointer>()));  // (1) (desde C++11)
(constexpr desde C++23)
pointer operator->() const noexcept;  // (2) (desde C++11)
(constexpr desde C++23)
```

  
`operator*` e `operator->` fornecem acesso ao objeto possuído por *this.

O comportamento é indefinido se get() == nullptr.

Essas funções membro são fornecidas apenas para `unique_ptr` para objetos únicos, ou seja, o template primário.

### Parameters

(nenhum)

### Return value

1) Retorna o objeto possuído por *this, equivalente a *get().

2) Retorna um ponteiro para o objeto possuído por *this, ou seja, get().

### Exceptions

1) Pode lançar uma exceção se `pointer` tiver um `operator*` que lança exceções.

### Notes

O uso de [std::add_lvalue_reference](<#/doc/types/add_reference>) serve para possibilitar a instanciação de [std::unique_ptr](<#/doc/memory/unique_ptr>)&lt;void&gt;, já que `void&` não é permitido em C++ enquanto [std::add_lvalue_reference](<#/doc/types/add_reference>)&lt;void&gt; produz `void`. Veja [LWG673](<https://cplusplus.github.io/LWG/issue673>) para detalhes.

### Example

Execute este código
```
    #include <iostream>
    #include <memory>
     
    struct Foo
    {
        void bar() { std::cout << "Foo::bar\n"; }
    };
     
    void f(const Foo&) 
    {
        std::cout << "f(const Foo&)\n";
    }
     
    int main() 
    {
        std::unique_ptr<Foo> ptr(new Foo);
     
        ptr->bar();
        f(*ptr);
    }
```

Saída: 
```
    Foo::bar
    f(const Foo&)
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 2762](<https://cplusplus.github.io/LWG/issue2762>) | C++11  | `operator*` poderia ser potencialmente-throwing mesmo que  
*get() fosse noexcept  | uma especificação de exceção condicional adicionada   
  
### See also

[ get](<#/doc/memory/unique_ptr/get>) |  retorna um ponteiro para o objeto gerenciado   
(função membro pública)  