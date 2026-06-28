# std::experimental::source_location

Definido no cabeçalho `[<experimental/source_location>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/source_location&action=edit&redlink=1> "cpp/header/experimental/source location \(page does not exist\)")`

```c
struct source_location;
```

A classe `source_location` representa certas informações sobre o código-fonte, como nomes de arquivos, números de linha e nomes de funções. Anteriormente, funções que desejavam obter essas informações sobre o local da chamada (para fins de registro, teste ou depuração) precisavam usar macros para que macros predefinidas como __LINE__ e __FILE__ fossem expandidas no contexto do chamador. A classe `source_location` oferece uma alternativa melhor.

### Funções membro

##### Criação

---
[ (constructor)](<#/doc/experimental/source_location/source_location>) | constrói um novo `source_location` com valores definidos pela implementação
(função membro pública)
[ current](<#/doc/experimental/source_location/current>)[static] | constrói um novo `source_location`
(função membro estática pública)

##### Outras funções membro especiais

(destructor)(implicitly declared) | destrói um `source_location`
(função membro pública)
operator=(implicitly declared) | operadores de atribuição de cópia/movimentação implicitamente declarados
(função membro pública)

##### Acesso a campos

[ line](<#/doc/experimental/source_location/line>) | retorna o número da linha representado por este objeto
(função membro pública)
[ column](<#/doc/experimental/source_location/column>) | retorna o número da coluna representado por este objeto
(função membro pública)
[ file_name](<#/doc/experimental/source_location/file_name>) | retorna o nome do arquivo representado por este objeto
(função membro pública)
[ function_name](<#/doc/experimental/source_location/function_name>) | retorna o nome da função representado por este objeto, se houver
(função membro pública)

### Exemplo

Execute este código
```cpp
    #include <experimental/source_location>
    #include <iostream>
    #include <string_view>
    
    void log(const std::string_view message,
             const std::experimental::source_location location =
                   std::experimental::source_location::current())
    {
        std::cout << "info:"
                  << location.file_name() << ':'
                  << location.line() << ' '
                  << message << '\n';
    }
    
    int main()
    {
        log("Hello world!");
    }
```

Saída possível:
```
    info:main.cpp:15 Hello world!
```