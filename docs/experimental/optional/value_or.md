# std::experimental::optional&lt;T&gt;::value_or

template< class U >   
constexpr T value_or( U&& default_value ) const&; |  |  (library fundamentals TS)  
template< class U >   
constexpr T value_or( U&& default_value ) &&; |  |  (library fundamentals TS)  

  
Retorna o valor contido se *this tiver um valor, caso contrário retorna default_value. 

1) Equivalente a bool(*this) ? **this : static_cast&lt;T&gt;([std::forward](<#/doc/utility/forward>)&lt;U&gt;(default_value)).

2) Equivalente a bool(*this) ? std::move(**this) : static_cast&lt;T&gt;([std::forward](<#/doc/utility/forward>)&lt;U&gt;(default_value)).

### Parâmetros

default_value  |  \-  |  o valor a ser usado caso *this esteja vazio   
Requisitos de tipo   
-`T` deve satisfazer os requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>) para usar a sobrecarga (1).   
-`T` deve satisfazer os requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>) para usar a sobrecarga (2).   
-`U&&` deve ser conversível para `T`.   
  
### Valor de retorno

O valor atual se *this tiver um valor, ou default_value caso contrário. 

### Exceções

Qualquer exceção lançada pelo construtor selecionado do valor de retorno `T`. 

### Exemplo

Execute este código
```
    #include <cstdlib>
    #include <experimental/optional>
    #include <iostream>
     
    std::experimental::optional<const char*> maybe_getenv(const char* n)
    {
        if (const char* x = std::getenv(n))
            return x;
        else
            return {};
    }
     
    int main()
    {
        std::cout << maybe_getenv("MYPWD").value_or("(none)") << '\n';
    }
```

Saída possível: 
```
    (none)
```

### Veja também

[ value](<#/doc/experimental/optional/value>) |  retorna o valor contido   
(função membro pública)  