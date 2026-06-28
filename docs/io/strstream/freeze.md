# std::strstream::freeze

```cpp
void freeze( bool flag = true );
```
| | (obsoleto desde C++98)
---|---|---
| | (removido em C++26)

Se o stream estiver usando um array alocado dinamicamente para saída, desabilita (`flag == true`) ou habilita (`flag == false`) a alocação/desalocação automática do buffer. Efetivamente chama `rdbuf()->freeze(flag)`.

### Observações

Após uma chamada para `[str()](<#/doc/io/strstream/str>)`, streams dinâmicos são congelados automaticamente. Uma chamada para `freeze(false)` é necessária antes de sair do escopo no qual este objeto `strstream` foi criado, caso contrário, o destrutor vazará memória. Além disso, saída adicional para um stream congelado pode ser truncada assim que atingir o final do buffer alocado.

### Parâmetros

- **flag** — status desejado

### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <strstream>
    
    int main()
    {
        std::strstream dyn; // buffer de saída alocado dinamicamente
        dyn << "Test: " << 1.23; // nota: sem std::ends para demonstrar anexação
        std::cout << "The output stream contains \"";
        std::cout.write(dyn.str(), dyn.pcount()) << "\"\n";
        // o stream agora está congelado devido a str()
        dyn << " More text"; // a saída para um stream congelado pode ser truncada
        std::cout << "The output stream contains \"";
        std::cout.write(dyn.str(), dyn.pcount()) << "\"\n";
        dyn.freeze(false); // freeze(false) deve ser chamado ou o destrutor vazará memória
    
        std::strstream dyn2; // buffer de saída alocado dinamicamente
        dyn2 << "Test: " << 1.23; // nota: sem std::ends
        std::cout << "The output stream contains \"";
        std::cout.write(dyn2.str(), dyn2.pcount()) << "\"\n";
        dyn2.freeze(false);   // descongelar o stream após str()
        dyn2 << " More text" << std::ends; // a saída não será truncada (o buffer cresce)
        std::cout << "The output stream contains \"" << dyn2.str() << "\"\n";
        dyn2.freeze(false); // freeze(false) deve ser chamado ou o destrutor vazará memória
    }
```

Saída possível:
```
    The output stream contains "Test: 1.23"
    The output stream contains "Test: 1.23 More "
    The output stream contains "Test: 1.23"
    The output stream contains "Test: 1.23 More text"
```

### Veja também

`[ freeze](<#/doc/io/strstreambuf/freeze>)` | define/limpa o estado congelado do buffer
(função membro pública de `std::strstreambuf`)