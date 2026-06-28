# std::wmemmove

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
wchar_t* wmemmove( wchar_t* dest, const wchar_t* src, std::size_t count );
```

Copia exatamente 'count' caracteres largos sucessivos do array de caracteres largos apontado por 'src' para o array de caracteres largos apontado por 'dest'.

Se 'count' for zero, a função não faz nada.

Os arrays podem se sobrepor: a cópia ocorre como se os caracteres largos fossem copiados para um array temporário de caracteres largos e então copiados do array temporário para 'dest'.

### Parâmetros

- **dest** — ponteiro para o array de caracteres largos para o qual copiar
- **src** — ponteiro para o array de caracteres largos do qual copiar
- **count** — número de caracteres largos a serem copiados

### Valor de retorno

Retorna uma cópia de 'dest'.

### Observações

Esta função não é sensível à localidade e não presta atenção aos valores dos objetos wchar_t que copia: nulos, assim como caracteres inválidos, também são copiados.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <locale>
     
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wcout.imbue(std::locale("en_US.utf8"));
     
        wchar_t str[] = L"αβγδεζηθικλμνξοπρστυφχψω";
        std::wcout << str << '\n';
        std::wmemmove(str + 4, str + 3, 3); // copy from [δεζ] to [εζη]
        std::wcout << str << '\n';
    }
```

Saída possível:
```
    αβγδεζηθικλμνξοπρστυφχψω
    αβγδδεζθικλμνξοπρστυφχψω
```

### Veja também

[ wmemcpy](<#/doc/string/wide/wmemcpy>) | copia uma certa quantidade de caracteres largos entre dois arrays não sobrepostos
(função)
[ memmove](<#/doc/string/byte/memmove>) | move um buffer para outro
(função)
[ copycopy_if](<#/doc/algorithm/copy>)(C++11) | copia um range de elementos para um novo local
(modelo de função)
[ copy_backward](<#/doc/algorithm/copy_backward>) | copia um range de elementos em ordem inversa
(modelo de função)
[Documentação C](<#/>) para wmemmove