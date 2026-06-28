# std::experimental::filesystem::path::compare

int compare( const path& p ) const noexcept; | (1) | (filesystem TS)
---|---|---
int compare( const string_type& str ) const; | (2) | (filesystem TS)
int compare( const value_type* s ) const; | (3) | (filesystem TS)

Compara as representações lexicais do path e de outro path.

1) Retorna um valor menor que, igual a ou maior que 0 se a representação nativa do path ([native](<#/doc/experimental/fs/path/native>)()) for, respectivamente, lexicograficamente menor que, igual a ou maior que a representação nativa de p (p.native()). A comparação é realizada elemento a elemento, como se iterando ambos os paths de [begin](<#/doc/experimental/fs/path/begin>)() até [end](<#/doc/experimental/fs/path/begin>)().

2) Equivalente a compare(path(str)).

3) Equivalente a compare(path(s)).

### Parâmetros

- **p** — um path para comparar
- **str** — uma string representando o path para comparar
- **s** — uma string terminada em nulo representando o path para comparar

### Valor de retorno

Um valor menor que 0 se o path for lexicograficamente menor que o path fornecido.

Um valor igual a 0 se o path for lexicograficamente igual ao path fornecido.

Um valor maior que 0 se o path for lexicograficamente maior que o path fornecido.

### Exceções

2,3) Pode lançar exceções definidas pela implementação.

### Observações

Para comparações bidirecionais, [operadores binários](<#/doc/experimental/fs/path/operator_cmp>) podem ser mais adequados.

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    void demo(int rc, fs::path p1, fs::path p2)
    {
        if (rc < 0)
            std::cout << p1 << " < " << p2 << '\n';
        else if (rc > 0)
            std::cout << p1 << " > " << p2 << '\n';
        else if (rc == 0)
            std::cout << p1 << " = " << p2 << '\n';
    }
    
    int main()
    {
        fs::path p1 = "/a/b/"; // as if "a/b/." for lexicographical iteration
        fs::path p2 = "/a/b/#";
        demo(p1.compare(p2), p1, p2);
        demo(p1.compare("a/b/_"), p1, "a/b/_");
    }
```

Saída:
```
    "/a/b/" > "/a/b/#"
    "/a/b/" < "a/b/_"
```

### Veja também

[ operator==operator!=operator<operator<=operator>operator>=](<#/doc/experimental/fs/path/operator_cmp>) | compara dois paths lexicograficamente
(função)