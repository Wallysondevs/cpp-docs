# std::basic_filebuf&lt;CharT,Traits&gt;::operator=

```cpp
std::basic_filebuf& operator=( std::basic_filebuf&& rhs );  // (1) (desde C++11)
std::basic_filebuf& operator=( const std::basic_filebuf& rhs ) = delete;  // (2)
```

Atribui outro objeto `basic_filebuf`.

1) Primeiro chama [close()](<#/doc/io/basic_filebuf/close>) para fechar o arquivo associado, então move o conteúdo de rhs para *this: os buffers de put e get, o arquivo associado, o locale, o openmode, a flag is_open, e qualquer outro estado. Após a movimentação, rhs não está associado a um arquivo e rhs.is_open() == false.

2) O operador de atribuição de cópia é deletado; `basic_filebuf` não é [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Parâmetros

- **rhs** — outro `basic_filebuf` do qual o conteúdo será movido

### Valor de retorno

*this

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <fstream>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::ofstream{"test.in"} << "test\n"; // escreve via um objeto temporário
        std::ifstream fin("test.in"); // stream somente leitura
        std::ofstream fout("test.out"); // stream somente escrita
     
        std::string s;
        std::getline(fin, s);
        std::cout << "s = [" << s << "]\n"; // s contém "test"
     
        assert(fout.is_open());
        *fin.rdbuf() = std::move(*fout.rdbuf());
        assert(!fout.is_open());
     
        std::getline(fin, s);
        std::cout << "s = [" << s << "]\n"; // s é entrada vazia
    }
```

Saída:
```
    s = [test]
    s = []
```

### Veja também

[ (constructor)](<#/doc/io/basic_filebuf/basic_filebuf>) | constrói um objeto `basic_filebuf`
(função membro pública)
[ swap](<#/doc/io/basic_filebuf/swap>)(C++11) | troca dois objetos `basic_filebuf`
(função membro pública)