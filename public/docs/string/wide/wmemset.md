# std::wmemset

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
wchar_t* wmemset( wchar_t* dest, wchar_t ch, std::size_t count );
```

Copia o wide character ch para cada um dos primeiros count wide characters do array de wide characters apontado por dest.

Se ocorrer overflow, o comportamento é indefinido.

Se count for zero, a função não faz nada.

### Parâmetros

- **dest** — ponteiro para o array de wide characters a ser preenchido
- **ch** — wide character de preenchimento
- **count** — número de wide characters a serem preenchidos

### Valor de retorno

Retorna uma cópia de dest.

### Observações

Esta função não é sensível à localidade e não presta atenção aos valores dos objetos wchar_t que ela escreve: nulos, assim como wide characters inválidos, também são escritos.

### Exemplo

Execute este código
```
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <locale>
     
    int main()
    {
        wchar_t ar[4] = {L'1', L'2', L'3', L'4'};
        std::wmemset(ar, L'\U0001f34c', 2); // replaces [12] with the 🍌 bananas
        std::wmemset(ar + 2, L'蕉', 2); // replaces [34] with the 蕉 bananas
     
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout.imbue(std::locale("en_US.utf8"));
        std::wcout << std::wstring(ar, 4) << '\n';
    }
```

Saída possível:
```
    🍌🍌蕉蕉
```

### Veja também

[ memset](<#/doc/string/byte/memset>) | preenche um buffer com um caractere
(função)
[ wmemcpy](<#/doc/string/wide/wmemcpy>) | copia uma certa quantidade de wide characters entre dois arrays não sobrepostos
(função)
[ fill_n](<#/doc/algorithm/fill_n>) | atribui por cópia o valor dado a N elementos em um range
(modelo de função)
[Documentação C](<#/>) para wmemset