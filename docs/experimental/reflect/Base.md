# std::experimental::reflect::Base

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Base = Object<T> && /* see below */;
```

  
O conceito `Base` é satisfeito se e somente se `T` reflete uma classe base direta, conforme retornado pelo template [`get_base_classes`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_base_classes&action=edit&redlink=1> "cpp/experimental/reflect/get base classes \(page does not exist\)"). 

### Exemplo

| Esta seção está incompleta  
Razão: exemplos   
  
### Veja também

| Esta seção está incompleta  
Razão: templatização   