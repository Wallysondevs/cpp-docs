# std::basic_filebuf&lt;CharT,Traits&gt;::open

basic_filebuf* open( const char* s, [std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode ); | (1) |
---|---|---
basic_filebuf* open( const [std::string](<#/doc/string/basic_string>)& str, [std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode ); | (2) | (desde C++11)
basic_filebuf* open( const [std::filesystem::path](<#/doc/filesystem/path>)& p,
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode ); | (3) | (desde C++17)
basic_filebuf* open( const std::filesystem::path::value_type* s,
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode ); | (4) | (desde C++17)

Se o arquivo associado já estiver aberto (is_open() != false), retorna um ponteiro nulo imediatamente.

Caso contrário, abre o arquivo com o nome fornecido (s, p.c_str()(desde C++17) ou str.c_str(), dependendo da sobrecarga). Os valores de [std::ios_base::openmode](<#/doc/io/ios_base/openmode>) podem ser escritos como, por exemplo, [std::ios_base::out](<#/doc/io/ios_base/openmode>) | [std::ios_base::app](<#/doc/io/ios_base/openmode>).

A sobrecarga (4) é fornecida apenas se `std::filesystem::path::value_type` não for char. | (desde C++17)

O arquivo é aberto como se chamasse [std::fopen](<#/doc/io/c/fopen>) com o segundo argumento (modo de acesso ao arquivo) determinado pelo resultado de mode & ~[std::ios_base::ate](<#/doc/io/ios_base/openmode>) da seguinte forma, `open()` falha se o resultado não for alguma combinação de flags mostradas na tabela:

mode & ~[std::ios_base::ate](<#/doc/io/ios_base/openmode>) | ﻿[std::fopen](<#/doc/io/c/fopen>) ﻿
modo de acesso | Ação se o arquivo já existe | Ação se o arquivo não existe
[`binary`](<#/doc/io/ios_base/openmode>) | [`in`](<#/doc/io/ios_base/openmode>) | [`out`](<#/doc/io/ios_base/openmode>) | [`trunc`](<#/doc/io/ios_base/openmode>) | [`app`](<#/doc/io/ios_base/openmode>) | [`noreplace`](<#/doc/io/ios_base/openmode>)
(desde C++23)
\- | \+ | - | - | - | - | "r" | Leitura do início | Falha ao abrir
\+ | \+ | - | - | - | - | "rb"
\- | \+ | \+ | - | - | - | "r+" | Erro
\+ | \+ | \+ | - | - | - | "r+b"
- **\-** — \+ | - | - | - | "w" | Destruir conteúdo | Criar novo
- **\-** — \+ | \+ | - | -
- **\+** — \+ | - | - | - | "wb"
- **\+** — \+ | \+ | - | -
\- | \+ | \+ | \+ | - | - | "w+"
\+ | \+ | \+ | \+ | - | - | "w+b"
- **\-** — \+ | - | - | \+ | "wx" | Falha ao abrir | Criar novo
- **\-** — \+ | \+ | - | \+
- **\+** — \+ | - | - | \+ | "wbx"
- **\+** — \+ | \+ | - | \+
\- | \+ | \+ | \+ | - | \+ | "w+x"
\+ | \+ | \+ | \+ | - | \+ | "w+bx"
- **\-** — \+ | - | \+ | - | "a" | Escrever no final | Criar novo
- **\-** — - | - | \+ | -
- **\+** — \+ | - | \+ | - | "ab"
- **\+** — - | - | \+ | -
\- | \+ | \+ | - | \+ | - | "a+"
\- | \+ | - | - | \+ | -
\+ | \+ | \+ | - | \+ | - | "a+b"
\+ | \+ | - | - | \+ | -

Se a operação de abertura for bem-sucedida e (openmode & [std::ios_base::ate](<#/doc/io/ios_base/openmode>)) != 0 (o bit `ate` estiver definido), reposiciona a posição do arquivo para o final do arquivo, como se chamasse [std::fseek](<#/doc/io/c/fseek>)(file, 0, [SEEK_END](<#/doc/io/c>)), onde file é o ponteiro retornado pela chamada a [std::fopen](<#/doc/io/c/fopen>). Se o reposicionamento falhar, chama [close()](<#/doc/io/basic_filebuf/close>) e retorna um ponteiro nulo para indicar falha.

### Parameters

- **s, str, p** — o nome do arquivo a ser aberto; s deve apontar para uma string terminada em nulo
- **openmode** — o modo de abertura do arquivo, um OR binário dos modos [std::ios_base::openmode](<#/doc/io/ios_base/openmode>)

### Return value

this em caso de sucesso, um ponteiro nulo em caso de falha.

### Notes

`open()` é tipicamente chamado através do construtor ou da função membro `open()` de [std::basic_fstream](<#/doc/io/basic_fstream>).

### Example

Execute este código
```
    #include <fstream>
    #include <iostream>
    
    int main()
    {
        std::string filename = "Test.b";
        std::filebuf fb;
    
        // prepare a file to read
        double d = 3.14;
        if (!fb.open(filename, std::ios::binary | std::ios::out))
        {
            std::cout << "Open file " << filename << " for write failed\n";
            return 1;
        }
        fb.sputn(reinterpret_cast<char*>(&d), sizeof d);
        fb.close();
    
        // open file for reading
        double d2 = 0.0;
        if (!fb.open(filename, std::ios::binary | std::ios::in))
        {
            std::cout << "Open file " << filename << " for read failed\n";
            return 1;
        }
    
        auto got = fb.sgetn(reinterpret_cast<char*>(&d2), sizeof d2);
        if (sizeof(d2) != got)
            std::cout << "Read of " << filename << " failed\n";
        else
            std::cout << "Read back from file: " << d2 << '\n';
    }
```

Saída:
```
    Read back from file: 3.14
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 596](<https://cplusplus.github.io/LWG/issue596>) | C++98 | `open()` não conseguia abrir arquivos em modo de anexação | pode abrir em modo de anexação

### See also

[ is_open](<#/doc/io/basic_filebuf/is_open>) | verifica se o arquivo associado está aberto
(função membro pública)
[ close](<#/doc/io/basic_filebuf/close>) | descarrega o buffer da área de escrita e fecha o arquivo associado
(função membro pública)