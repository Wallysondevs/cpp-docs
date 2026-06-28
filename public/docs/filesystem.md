# Biblioteca Filesystem (desde C++17)

A biblioteca Filesystem fornece facilidades para realizar operações em sistemas de arquivos e seus componentes, como paths, arquivos regulares e diretórios.

A biblioteca filesystem foi originalmente desenvolvida como [boost.filesystem](<https://www.boost.org/doc/libs/release/libs/filesystem/doc/index.htm>), foi publicada como [a especificação técnica ISO/IEC TS 18822:2015](<#/doc/experimental/fs>), e finalmente incorporada ao ISO C++ a partir do C++17. A implementação do boost está atualmente disponível em mais compiladores e plataformas do que a biblioteca C++17.

As facilidades da biblioteca filesystem podem estar indisponíveis se um sistema de arquivos hierárquico não for acessível à implementação, ou se ela não fornecer as capacidades necessárias. Algumas funcionalidades podem não estar disponíveis se não forem suportadas pelo sistema de arquivos subjacente (por exemplo, o sistema de arquivos FAT não possui links simbólicos e proíbe múltiplos hardlinks). Nesses casos, erros devem ser reportados.

O comportamento é [indefinido](<#/doc/language/ub>) se as chamadas para funções nesta biblioteca introduzirem uma _condição de corrida do sistema de arquivos_ (file system race), ou seja, quando múltiplos threads, processos ou computadores intercalam acesso e modificação ao mesmo objeto em um sistema de arquivos.

#### Definições em toda a biblioteca

*   _arquivo_ : um objeto do sistema de arquivos que contém dados, pode ser escrito, lido ou ambos. Arquivos possuem nomes, atributos, um dos quais é o tipo de arquivo:

*   _diretório_ : um arquivo que atua como um contêiner de entradas de diretório, que identificam outros arquivos (alguns dos quais podem ser outros diretórios aninhados). Ao discutir um arquivo específico, o diretório no qual ele aparece como uma entrada é seu _diretório pai_. O diretório pai pode ser representado pelo pathname relativo "..".
*   _arquivo regular_ : uma entrada de diretório que associa um nome a um arquivo existente (ou seja, um _hard link_). Se múltiplos hard links forem suportados, o arquivo é removido após a remoção do último hard link para ele.
*   _link simbólico_ : uma entrada de diretório que associa um nome a um path, que pode ou não existir.
*   outros tipos de arquivos especiais: _block_ , _character_ , _fifo_ , _socket_.

*   _nome de arquivo_ : uma string de caracteres que nomeia um arquivo. Caracteres permitidos, sensibilidade a maiúsculas/minúsculas, comprimento máximo e nomes não permitidos são definidos pela implementação. Os nomes "." (ponto) e ".." (ponto-ponto) têm significado especial no nível da biblioteca.
*   _path_ : sequência de elementos que identifica um arquivo. Começa com um root-name opcional (por exemplo, "C:" ou "//server" no Windows), seguido por um root-directory opcional (por exemplo, "/" no Unix), seguido por uma sequência de zero ou mais nomes de arquivo (todos, exceto o último, devem ser diretórios ou links para diretórios). O formato nativo (por exemplo, quais caracteres são usados como separadores) e a codificação de caracteres da representação em string de um path (o _pathname_) são definidos pela implementação; esta biblioteca fornece uma representação portátil de paths.

*   _path absoluto_ : um path que identifica inequivocamente a localização de um arquivo.
*   _path canônico_ : um path absoluto que não inclui symlinks, elementos "." ou "..".
*   _path relativo_ : um path que identifica a localização de um arquivo em relação a alguma localização no sistema de arquivos. Os nomes de path especiais "." (ponto, "diretório atual") e ".." (ponto-ponto, "diretório pai") são paths relativos.

### Classes

---
Definido no header `[<filesystem>](<#/doc/header/filesystem>)`

```cpp
Definido no namespace `std::filesystem`
 path(C++17)
(classe)
 filesystem_error(C++17)
(classe)
 directory_entry(C++17)
(classe)
 directory_iterator(C++17)
(classe)
 recursive_directory_iterator(C++17)
(classe)
 file_status(C++17)
(classe)
 space_info(C++17)
(classe)
 file_type(C++17)
(enum)
 perms(C++17)
(enum)
 perm_options(C++17)
(enum)
 copy_options(C++17)
(enum)
 directory_options(C++17)
(enum)
 file_time_type(C++17)
(typedef)
```

### Funções não-membro

Definido no header `[<filesystem>](<#/doc/header/filesystem>)`

```cpp
Definido no namespace `std::filesystem`
 absolute(C++17)
(função)
 canonicalweakly_canonical(C++17)
(função)
 relativeproximate(C++17)
(função)
 copy(C++17)
(função)
 copy_file(C++17)
(função)
 copy_symlink(C++17)
(função)
 create_directorycreate_directories(C++17)(C++17)
(função)
 create_hard_link(C++17)
(função)
 create_symlinkcreate_directory_symlink(C++17)(C++17)
(função)
 current_path(C++17)
(função)
 exists(C++17)
(função)
 equivalent(C++17)
(função)
 file_size(C++17)
(função)
 hard_link_count(C++17)
(função)
 last_write_time(C++17)
(função)
 permissions(C++17)
(função)
 read_symlink(C++17)
(função)
 removeremove_all(C++17)(C++17)
remove um arquivo ou diretório e todo o seu conteúdo, recursivamente
(função)
 rename(C++17)
(função)
 resize_file(C++17)
(função)
 space(C++17)
(função)
 statussymlink_status(C++17)(C++17)
determina atributos de arquivo, verificando o alvo do symlink
(função)
 temp_directory_path(C++17)
(função)
```

##### Tipos de arquivo

[ is_block_file](<#/doc/filesystem/is_block_file>)(C++17) | verifica se o path fornecido se refere a um dispositivo de bloco
(função)
[ is_character_file](<#/doc/filesystem/is_character_file>)(C++17) | verifica se o path fornecido se refere a um dispositivo de caractere
(função)
[ is_directory](<#/doc/filesystem/is_directory>)(C++17) | verifica se o path fornecido se refere a um diretório
(função)
[ is_empty](<#/doc/filesystem/is_empty>)(C++17) | verifica se o path fornecido se refere a um arquivo ou diretório vazio
(função)
[ is_fifo](<#/doc/filesystem/is_fifo>)(C++17) | verifica se o path fornecido se refere a um named pipe
(função)
[ is_other](<#/doc/filesystem/is_other>)(C++17) | verifica se o argumento se refere a um arquivo _outro_
(função)
[ is_regular_file](<#/doc/filesystem/is_regular_file>)(C++17) | verifica se o argumento se refere a um arquivo regular
(função)
[ is_socket](<#/doc/filesystem/is_socket>)(C++17) | verifica se o argumento se refere a um socket IPC nomeado
(função)
[ is_symlink](<#/doc/filesystem/is_symlink>)(C++17) | verifica se o argumento se refere a um link simbólico
(função)
[ status_known](<#/doc/filesystem/status_known>)(C++17) | verifica se o status do arquivo é conhecido
(função)

### Notas

O uso desta biblioteca pode exigir opções adicionais do compilador/linker. A implementação GNU anterior a 9.1 requer linkagem com `-lstdc++fs` e a implementação LLVM anterior a LLVM 9.0 requer linkagem com `-lc++fs`.

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Std | Funcionalidade
---|---|---|---
[`__cpp_lib_filesystem`](<#/doc/feature_test>) | [`201703L`](<#/>) | (C++17) | Biblioteca Filesystem

### Veja também

[Documentação C++](<#/doc/experimental/fs>) para File System TS
---