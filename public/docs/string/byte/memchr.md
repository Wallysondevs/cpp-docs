# std::memchr

Definido no cabeçalho `[<cstring>](<#/doc/header/cstring>)`

```c
const void* memchr( const void* ptr, int ch, std::size_t count );
void* memchr( void* ptr, int ch, std::size_t count );
```

Converte `ch` para unsigned char e localiza a primeira ocorrência desse valor nos `count` bytes iniciais (cada um interpretado como unsigned char) do objeto apontado por `ptr`.

Esta função se comporta como se lesse os bytes sequencialmente e parasse assim que um byte correspondente fosse encontrado: se o array apontado por `ptr` for menor que `count`, mas a correspondência for encontrada dentro do array, o comportamento é bem definido. | (desde C++17)

### Parâmetros

- **ptr** — ponteiro para o objeto a ser examinado
- **ch** — byte a ser procurado
- **count** — número máximo de bytes a serem examinados

### Valor de retorno

Ponteiro para a localização do byte, ou um ponteiro nulo se nenhum byte for encontrado.

### Exemplo

Procura em um array de caracteres.

Execute este código
```
    #include <cstring>
    #include <iostream>
     
    int main()
    {
        char arr[] = {'a', '\0', 'a', 'A', 'a', 'a', 'A', 'a'};
        char *pc = (char*) std::memchr(arr, 'A', sizeof arr);
        if (pc != nullptr)
            std::cout << "search character found\n";
        else
            std::cout << "search character not found\n";
    }
```

Saída:
```
    search character found
```

### Veja também

[ strchr](<#/doc/string/byte/strchr>) | encontra a primeira ocorrência de um caractere
(function)
[ findfind_iffind_if_not](<#/doc/algorithm/find>)(C++11) | encontra o primeiro elemento que satisfaz critérios específicos
(function template)
[C documentation](<#/>) para memchr