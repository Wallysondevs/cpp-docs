# std::basic_string_view&lt;CharT,Traits&gt;::empty

```cpp
constexpr bool empty() const noexcept;  // (desde C++17)
```

  
Verifica se a view não possui caracteres, ou seja, se [size()](<#/doc/string/basic_string_view/size>) `==` ​0​. 

### Parâmetros

(nenhum) 

### Valor de retorno

`true` se a view estiver vazia, `false` caso contrário. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string_view>
     
    // Imprime uma string entre aspas simples, seu
    // comprimento e se é considerada vazia.
    void check_string(std::string_view ref)
    {
        std::cout << std::boolalpha
                  << "'" << ref << "' has " << ref.size()
                  << " character(s); emptiness: " << ref.empty() << '\n';
    }
     
    int main(int argc, char **argv)
    {
        // Uma string vazia
        check_string("");
     
        // Quase sempre não vazia: argv[0]
        if (argc > 0)
            check_string(argv[0]);
    }
```

Saída possível: 
```
    '' has 0 character(s); emptiness: true
    './a.out' has 7 character(s); emptiness: false
```

### Veja também

[ sizelength](<#/doc/string/basic_string_view/size>) |  retorna o número de caracteres   
(função membro pública)  
[ max_size](<#/doc/string/basic_string_view/max_size>) |  retorna o número máximo de caracteres   
(função membro pública)  
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) |  retorna o tamanho de um container ou array   
(modelo de função)  
[ empty](<#/doc/iterator/empty>)(C++17) |  verifica se o container está vazio   
(modelo de função)  
[ empty](<#/doc/string/basic_string/empty>) |  verifica se a string está vazia   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)