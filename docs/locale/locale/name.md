# std::locale::name

Definido no header `[<locale>](<#/doc/header/locale>)`

```cpp
std::string name() const;
```

  
Retorna o nome do locale, que é o nome pelo qual ele é conhecido pelo sistema operacional, como "POSIX" ou "en_US.UTF8" ou "English_United States.1252". Se o locale não for uma cópia de um locale fornecido pelo sistema, a string "*" é retornada. 

### Valor de retorno

O nome do locale ou "*" se não tiver nome. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <string>
     
    int main()
    {
        std::locale loc(std::locale(), new std::ctype<char>);
        std::cout << "The default locale is " << std::locale().name() << '\n'
                  << "The user's locale is " << std::locale("").name() << '\n'
                  << "A nameless locale is " << loc.name() << '\n';
    }
```

Saída possível: 
```
    The default locale is C
    The user's locale is en_US.UTF8
    A nameless locale is *
```

### Veja também

[ (constructor)](<#/doc/locale/locale/locale>) |  constrói um novo locale   
(função membro pública)  