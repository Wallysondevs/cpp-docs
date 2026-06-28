# std::experimental::basic_string_view&lt;CharT,Traits&gt;::operator=

basic_string_view& operator=( const basic_string_view& view ) noexcept = default; |  |  (library fundamentals TS)  

  
Substitui a view pela de `view`. 

### Parâmetros

view  |  \-  |  view a ser copiada   
  
### Valor de retorno

*this

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <experimental/string_view>
    int main()
    {
        std::experimental::string_view v = "Hello, world";
        v = v.substr(7);
        std::cout << v << '\n';
    }
```

Saída: 
```
    world
```

### Veja também

[ (constructor)](<#/doc/experimental/basic_string_view/basic_string_view>) |  constrói um `basic_string_view`   
(função membro pública)  