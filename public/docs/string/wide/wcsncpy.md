# std::wcsncpy

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
wchar_t* wcsncpy( wchar_t* dest, const wchar_t* src, std::size_t count );
```

Copia no máximo 'count' caracteres da wide string apontada por 'src' (incluindo o caractere nulo largo terminador) para o array de caracteres largos apontado por 'dest'.

Se 'count' for atingido antes que a string 'src' inteira seja copiada, o array de caracteres largos resultante não será terminado em nulo.

Se, após copiar o caractere nulo largo terminador de 'src', 'count' não for atingido, caracteres nulos largos adicionais são escritos em 'dest' até que o total de 'count' caracteres tenha sido escrito.

Se as strings se sobrepuserem, o comportamento é indefinido.

### Parâmetros

- **dest** — ponteiro para o array de caracteres largos para o qual copiar
- **src** — ponteiro para a wide string da qual copiar
- **count** — número máximo de caracteres largos a copiar

### Valor de retorno

dest

### Observações

No uso típico, 'count' é o tamanho do array de destino.

### Exemplo

Execute este código
```cpp
    #include <cwchar>
    #include <iostream>
     
    int main()
    {
        const wchar_t src[] = L"hi";
        wchar_t dest[6] = {L'a', L'b', L'c', L'd', L'e', L'f'};
     
        std::wcsncpy(dest, src, 5); // this will copy 'hi' and repeat \0 three times
     
        std::wcout << "The contents of dest are: ";
        for (const wchar_t c : dest)
        {
            if (c)
                std::wcout << c << ' ';
            else
                std::wcout << "\\0" << ' ';
        }
        std::wcout << '\n';
    }
```

Saída:
```
    The contents of dest are: h i \0 \0 \0 f
```

### Veja também

[ wcscpy](<#/doc/string/wide/wcscpy>) | copia uma wide string para outra
(função)
[ wmemcpy](<#/doc/string/wide/wmemcpy>) | copia uma certa quantidade de caracteres largos entre dois arrays não sobrepostos
(função)
[ strncpy](<#/doc/string/byte/strncpy>) | copia uma certa quantidade de caracteres de uma string para outra
(função)
[Documentação C](<#/>) para wcsncpy